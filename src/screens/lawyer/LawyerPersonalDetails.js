/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseUrl from '../../constants';
import PageLoader from '../../components/PageLoader';
import LawyerFooter from '../../components/LawyerFooter';
const LawyerPersonalDetailss = () => {
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const getMe = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.get(`${baseUrl}user`, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response?.data?.data)
            if (response?.data?.status === 200) {
                setData(response?.data?.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error?.response)
        }
    }
    useEffect(() => {
        getMe()
    }, [])
    return (
        <>
            {
                isLoading ? (<PageLoader />) : (
                    <>
                        <ScrollView style={{ flex: 1 }}>
                            <SafeAreaView>
                                <View style={{ backgroundColor: '#151E70', width: '100%', height: 70 }}>
                                    <View style={{ display: 'flex', flexDirection: "row", margin: 20, gap: 20 }}>
                                        <Image source={require('../../assets/images/userVector.png')} />
                                        <Text style={{ color: '#FFFF', fontSize: 25 }}>My Profile</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={styles.image} source={require('../../assets/images/Dummy.png')} />
                                        <Text style={{ color: '#FFFFFF', fontSize: 35, marginLeft: 5, color: '#000000', fontFamily: 'Inter-Bold' }}>{data?.userName}</Text>
                                    </View>
                                </View>
                                {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 60 }}>

                                    <View>
                                        <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>Phone Number</Text>
                                        <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}> {data?.contactNo}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>City</Text>
                                        <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>{data?.city}</Text>
                                    </View>
                                </View> */}
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                                    <View style={{
                                        flexDirection: 'row', gap: 50
                                    }}>
                                        <View>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>email</Text>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>{data?.email}</Text>

                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>city</Text>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>{data?.city}</Text>

                                        </View>
                                    </View>

                                </View>

                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                                    <View style={{
                                        flexDirection: 'row', gap: 80
                                    }}>
                                        <View>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>contact</Text>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>{data?.contactNo}</Text>

                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>city</Text>
                                            <Text style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>{data?.city}</Text>

                                        </View>
                                    </View>
                                </View>
                                <View style={{marginTop : 40,marginLeft : 70}}>
                                    <Text  style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>About</Text>
                                    <Text  style={{ fontSize: 18, color: '#000000', fontFamily: 'Inter-Bold' }}>{data?.about}</Text>
                                </View>
                            </SafeAreaView>

                        </ScrollView>
                        <LawyerFooter></LawyerFooter>
                    </>
                )
            }
        </>
    )
}

export default LawyerPersonalDetailss

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginRight: 15,
    },
})