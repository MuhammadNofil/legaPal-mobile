/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from "axios";
import { RFPercentage } from 'react-native-responsive-fontsize';
// import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonLoader from '../../components/ActivityIndicator';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from '../../constants';
export default function PaymentDetails({ navigation, route }) {
    const { user } = route.params
    console.log(user)
    const RoleHandler = async () => {
        if (user?.role === 'lawyer') {
            navigation.navigate('LawyerDashboard')
        } else {
            navigation.navigate('Userhome')
        }
    }
    const [loading, isloading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    console.log(user, 'user')
    const schema = yup.object().shape({
        cardNumber: yup
            .string()
            .required('Card number is required')
            .matches(/^\d{14}$/, 'Card number must be 14 digits'),

        cvc: yup
            .string()
            .required('CVC is required')
            .matches(/^\d{3}$/, 'CVC must be 3 digits'),

        expiry: yup
            .string()
            .required('Expiry date is required')
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cardNumber: '',
            cvc: '',
            expiry: '',
        },
    });
    const onPressSend = async formData => {
        const data = {userId : user?._id,...formData}
        // console.log(formData);
        isloading(true)
        setButtonLoading(false)
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.post(
                `${baseUrl}card`,
                data, // Move the data parameter outside of the headers object
                {
                    headers: {
                        Authorization: token,
                        // Add other headers if needed
                    },
                }
            );
            if (response?.data?.status === 200) {
                RoleHandler()
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                setErrorMessage(error?.response?.data?.message)
                isloading(false)
                setButtonLoading(true)
                setError(true)
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingContainer}
            >
                <Text style={styles.registerHeading}>Card Information</Text>
                {/* <Text style={styles.subHeading}>lets help you meet up your task</Text> */}
                {/* <Image source={require('../../assets/images/profilepic.webp')} style={styles.imageUploader}/> */}
                <View style={styles.formContainer}>
                    <Text style={styles.placeholder}>Card Number</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Card Number"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="cardNumber"
                    />
                    {errors.cardNumber && (
                        <Text style={styles.warning}>{errors.cardNumber.message}</Text>
                    )}
                    <Text style={styles.placeholder}>CVC</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="CVC"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="cvc"
                    />
                    {errors.cvc && (
                        <Text style={styles.warning}>{errors.cvc.message}</Text>
                    )}
                    <Text style={styles.placeholder}>Expirey Date</Text>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Expirey date"
                                // secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="expiry"
                    />
                    {errors?.expiry && (
                        <Text style={styles.warning}>{errors?.expiry.message}</Text>
                    )}
                    {/* {errors?.confirmpassword && <Text style={styles.warning}>{errors?.confirmpassword.message}</Text>} */}
                    {isError && <Text style={styles.error}>{errorMessage}</Text>}
                    <Pressable
                        style={styles.buttonregister}
                        onPress={handleSubmit(onPressSend)}
                        disabled={loading ? true : false}>
                        {buttonLoading && <Text style={styles.button}>Submit</Text>}
                        {loading && <ButtonLoader />}
                    </Pressable>
                    <Pressable
                        style={styles.buttonregister}
                        onPress={RoleHandler}
                        disabled={loading ? true : false}>
                        <Text style={styles.button}>Skip</Text>
                    </Pressable>
                    <View style={styles.container}></View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardAvoidingContainer: {
        flex: 1,
        width: '100%', // Add this line to make sure the width is 100%
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    placeholder: {
        top: '5%',
        left: '3%',
        fontSize: RFPercentage(2),
        fontFamily: 'Inter-Bold',
        color: '#051744',
    },
    dropDownw: {
        marginTop: '10%',
        // borderRadius : 30
    },
    imageUploader: {
        // width : "70%"
        marginTop: '5%',
        height: '20%',
        borderRadius: 50,
        // borderColor : "#0000"
    },
    tag: {
        marginTop: '5%',
        marginLeft: '18%',
        fontSize: RFPercentage(2),
        color: '#051744',
        fontFamily: 'Inter-Bold',

        // alignItems : 'center',
        // justifyContent : 'center'
    },
    registerHeading: {
        fontFamily: 'Inter-Bold',
        color: '#051744',
        textAlign: 'center',
        fontSize: RFPercentage(5),
        marginBottom: '2%',
    },
    subHeading: {
        fontFamily: 'Inter-Bold',
        color: '#051744',
        marginBottom: '2%',
        marginTop: '2%',
        fontSize: RFPercentage(2),
    },
    formContainer: {
        width: '80%',
    },
    input: {
        fontFamily: 'Inter-Bold',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        padding: RFPercentage(1),
        backgroundColor: 'white',
        fontSize: RFPercentage(1.7),
        paddingLeft: 20,
        marginTop: '9%',
    },
    buttonregister: {
        backgroundColor: '#051744',
        borderColor: '#051744',
        borderWidth: 2,
        padding: RFPercentage(1.5),
        borderRadius: 25,
        alignItems: 'center',
        marginTop: '13%',
    },
    button: {
        textAlign: 'center',
        fontSize: RFPercentage(2),
        color: 'white',
        fontFamily: 'Inter-Bold',
    },
    warning: {
        color: '#E8505B',
        fontSize: RFPercentage(1.5),
        paddingTop: '1%',
        paddingLeft: 9,
    },
});
