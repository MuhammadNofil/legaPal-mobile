/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonLoader from "../../components/ActivityIndicator";
import axios from "axios";
import baseUrl from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PageLoader from "../../components/PageLoader";
import { ScrollView } from "react-native-gesture-handler";


const schema = yup.object().shape({

    userName: yup.string()
        .required('Username is Required')
        .min(8, 'Username must contain at least 8 Characters'),
    address: yup.string()
        .required('Username is Required'),
    city: yup.string()
        .required('Username is Required'),
    contactNo: yup.string()
        .required('Username is Required'),
    about: yup.string()
        .required('Username is Required')

});
export default function UpdateProfile({ navigation }) {

    const [loading, isloading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({})

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // resolver: yupResolver(schema),
        defaultValues: formData
    });

    const onSubmit = async (data) => {
        console.log(data)
        // const { email } = data
        isloading(true)
        setButtonLoading(false)
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            const response = await axios.patch(`${baseUrl}user`, data, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response?.data?.status)
            if (response?.data?.status === 200) {
                isloading(false)
                setButtonLoading(true)
                setData(response?.data?.data)
                // navigation.navigate('ConfirmOtp', { email: email });
            }
        } catch (error) {
            console.log(error?.response?.data, '??????')
            if (error?.response?.data?.message) {
                setErrorMessage(error?.response?.data?.message)
                isloading(false)
                setButtonLoading(true)
                setError(true)
            }
        }
    };

    const getUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.get(`${baseUrl}user`, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response)
            if (response.data.status === 200) {
                isloading(false)
                setData(response.data.data)
                if (response?.data?.data?.role === "user") {
                    console.log(response?.data , 'dadadad')
                    setFormData({
                        userName: response?.data?.data?.userName,
                        address: response?.data?.data?.address,
                        city: response?.data?.data?.city,
                        contactNo: response?.data?.data?.contactNo
                    })
                    console.log(formData)
                } else {
                    setFormData({
                        userName: response?.data?.data?.userName,
                        address: response?.data?.data?.address,
                        city: response?.data?.data?.city,
                        contactNo: response?.data?.data?.contactNo,
                        about: response?.data?.data?.contactNo
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUser()
    },[])
    return (
        <>
            {
                loading ? <PageLoader /> : (
                    <ScrollView > 
                        <View style={styles.container}>
                            {/* <Text style={styles.label}>Change Password</Text> */}
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={styles.image} source={require('../../assets/images/Dummy.png')} />
                                    {/* <Text style={{ color: '#FFFFFF', fontSize: 35, marginLeft: 5, color: '#000000', fontFamily: 'Inter-Bold' }}>Jon Doe</Text> */}
                                </View>
                            </View>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder= {formData?.userName}
                                        onChangeText={onChange}
                                        value={value}
                
                                    />
                                )}
                                name="userName"
                            />
                            {errors.userName && <Text style={styles.warning}>{errors.userName.message}</Text>}

                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder= {formData?.address}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="address"
                            />
                            {errors.address && <Text style={styles.warning}>{errors.address.message}</Text>}

                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder= {formData?.city}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="city"
                            />
                            {errors.city && <Text style={styles.warning}>{errors.city.message}</Text>}
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder= {formData?.contactNo}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="contactNo"
                            />
                            {errors.contactNo && <Text style={styles.warning}>{errors.contactNo.message}</Text>}
                            {
                                data?.role === "lawyer" && (
                                    <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        multiline
                                        numberOfLines={4}
                                        style={styles.textArea}
                                        placeholder={data?.about}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                                name="about"
                                />
                                )
                            }
                            {errors.about && <Text style={styles.warning}>{errors.about.message}</Text>}
                            {isError && <Text style={styles.error}>{errorMessage}</Text>}
                            <Pressable style={styles.sendButton} onPress={handleSubmit(onSubmit)}>
                                {buttonLoading && <Text style={styles.sendButtonText}>Update</Text>}
                                {loading && <ButtonLoader></ButtonLoader>}
                            </Pressable>
                        </View>
                    </ScrollView>
                )
            }
        </>

    );
}

const styles = StyleSheet.create({
    warning: {
        color: "red",
        fontSize: RFPercentage(1.7),
        marginTop: "2%",
        marginLeft: "13%",
        alignSelf: 'flex-start',
        fontFamily: "Inter-Bold",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginRight: 15,
        backgroundColor: 'black'
    },
    error: {
        color: "red",
        fontSize: RFPercentage(2),
        marginTop: 5,
        fontFamily: "Inter-Bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        gap: 10
    },
    label: {
        color: '#000000',
        fontFamily: "Inter-Bold",
        fontSize: RFPercentage(5),
        // marginTop: RFPercentage(20),
    },
    text: {
        color: "#000000",
        fontFamily: "Inter-Bold",
        marginTop: RFPercentage(15),
        marginBottom: RFPercentage(4),
        fontSize: RFPercentage(2.2),
    },
    input: {
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 25,
        color: 'black',
        padding: 10,
        fontFamily: "Inter-Bold",
        fontSize: RFPercentage(1.5),
        paddingLeft: RFPercentage(3),
        marginTop: 10,
        width: "80%",
    },
    textArea: {
        borderWidth: 2,
        backgroundColor: "white",
        borderColor: "black",
        borderRadius: 25,
        color: 'black',
        // padding: 10,
        fontFamily: "Inter-Bold",
        fontSize: RFPercentage(1.5),
        paddingLeft: RFPercentage(3),
        marginTop: 10,
        width: "80%",
    },
    sendButton: {
        backgroundColor: "#051744",
        borderColor: "#051744",
        borderWidth: 2,
        padding: 7,
        borderRadius: 25,
        width: "80%",
        alignItems: "center",
        marginTop: 22,
    },
    sendButtonText: {
        textAlign: "center",
        fontSize: RFPercentage(2),
        color: "white",
        fontFamily: "Inter-Bold",
    },
});
