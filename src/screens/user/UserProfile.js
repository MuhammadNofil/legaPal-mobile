/* eslint-disable prettier/prettier */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/Footer';
import axios from 'axios';
import baseUrl from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserProfile = ({navigation}) => {
    const signOutHandler = async() =>{
        const token = await AsyncStorage.removeItem('token')
        navigation.navigate('Login')
    }
    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <SafeAreaView>
                    <View style={{ backgroundColor: '#151E70', width: '100%', height: 70 }}>
                        <View style={{ display: 'flex', flexDirection: "row", margin: 20, gap: 20 }}>
                            <Image source={require('../../assets/images/userVector.png')} />
                            <Text style={{ color: '#FFFF', fontSize: 25 }}>User Profile</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.image} source={require('../../assets/images/Dummy.png')} />
                            {/* <Text style={{ color: '#FFFFFF', fontSize: 35, marginLeft: 5, color: '#000000', fontFamily: 'Inter-Bold' }}>Jon Doe</Text> */}
                        </View>
                    </View>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
                            <Icon name="user" size={30} color="#151E70" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 22, color: '#000000', fontFamily: 'Inter-Bold', flex: 1, marginLeft: 40 }}>Personal Details</Text>
                            <Image source={require('../../assets/images/directionVector.png')} style={{ marginLeft: 10 }} />
                        </View> */}
                        {/* <View style={{ backgroundColor: "#000000", width: '90%', height: 1, marginTop: 10 }}></View> */}

                        <Pressable onPress={()=> navigation.navigate('Change Password')} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
                            <Icon name="lock" size={30} color="#151E70" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 22, color: '#000000', fontFamily: 'Inter-Bold', flex: 1, marginLeft: 40 }}>Change Password</Text>
                            <Image source={require('../../assets/images/directionVector.png')} style={{ marginLeft: 10 }} />
                        </Pressable>
                        <View style={{ backgroundColor: "#000000", width: '90%', height: 1, marginTop: 10 }}></View>


                        <Pressable onPress={()=> navigation.navigate('Schedule Details')} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
                            <Icon name="calendar" size={30} color="#151E70" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 22, color: '#000000', fontFamily: 'Inter-Bold', flex: 1, marginLeft: 40 }}>Schedule Details</Text>
                            <Image source={require('../../assets/images/directionVector.png')} style={{ marginLeft: 10 }} />
                        </Pressable>
                        <View style={{ backgroundColor: "#000000", width: '90%', height: 1, marginTop: 10 }}></View>


                        <Pressable onPress={()=> navigation.navigate('Update Profile')} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }}>
                            <Icon name="user" size={30} color="#151E70" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 22, color: '#000000', fontFamily: 'Inter-Bold', flex: 1, marginLeft: 40 }}>Update Profile</Text>
                            <Image source={require('../../assets/images/directionVector.png')} style={{ marginLeft: 10 }} />
                        </Pressable>
                        <View style={{ backgroundColor: "#000000", width: '90%', height: 1, marginTop: 10 }}></View>
                        <Pressable style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20, marginTop: 20 }} onPress={signOutHandler}>
                            <Icon name="sign-out" size={30} color="#151E70" style={{ marginRight: 10 }} />
                            <Text style={{ fontSize: 22, color: '#000000', fontFamily: 'Inter-Bold', flex: 1, marginLeft: 40 }}>Logout</Text>
                            <Image source={require('../../assets/images/directionVector.png')} style={{ marginLeft: 10 }} />
                        </Pressable>
                        {/* <View style={{ backgroundColor: "#000000", width: '90%', height: 1, marginTop: 10 }}></View> */}


                    </View>

                </SafeAreaView>
            </ScrollView>
            <Footer></Footer>
        </>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginRight: 15,
    },
})