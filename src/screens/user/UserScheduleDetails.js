/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Card from '../../components/Card'
// import card from '../../components/card';
import Card from '../../components/Card';
import { TextInput } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import PageLoader from '../../components/PageLoader';
import axios from 'axios';
import baseUrl from '../../constants';
import LawyerFooter from '../../components/LawyerFooter';
import MeetingCardDetails from '../../components/MeetingDetailCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserMeetingCard from '../../components/UserMeetinCard';
const UserScheduleDetails = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [activeChip, setActiveChip] = useState('pending');
    const fetchAppointMentData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.get(`${baseUrl}appointement/getUserData?status=${activeChip}`, {
                headers: {
                    Authorization: token
                }
            })
            response?.data?.data.map((ele) => {
                console.log(ele?.user)
            })
            if (response.data.status === 200) {
                setLoading(false)
                setData(response?.data?.data)
            }
        } catch (error) {
            console.log(error?.response?.data)
        }
    }
    useEffect(() => {
        fetchAppointMentData()
        console.log(data, 'data')
    }, [activeChip])

    const chipHandler = (e) =>{
        setActiveChip(e)
        setLoading(true)
    }
    const cancelAppointMent = async(data) =>{
        console.log(data)
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.patch(`${baseUrl}appointement/cancel`,data,{
                headers : {
                    Authorization : token
                }
            })
            if (response?.data?.status === 200) {
                setData(response?.data?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {isLoading ? (
                <PageLoader />
            ) : (
                <>
                        <View style={styles.mainContainer}>
                    <ScrollView>
                            <View style={{flexDirection : 'row',justifyContent: 'space-between',margin: 12}}>
                                <Text  style={{borderWidth : 1,borderRadius:10,padding : 5 , color : activeChip === 'pending' ? '#FFFF' : 'black',fontFamily : 'Inter-Bold',backgroundColor: activeChip === 'pending' ? '#151E70' : '#D9D9D9',}} onPress={()=>chipHandler('pending')}>upcoming</Text>
                                <Text style={{borderWidth : 1,borderRadius:10,padding : 5 , color : activeChip === 'completed' ? '#FFFF' : 'black',fontFamily : 'Inter-Bold',backgroundColor: activeChip === 'completed' ? '#151E70' : '#D9D9D9',}} onPress={()=>chipHandler('completed')}>completed</Text>
                                <Text style={{borderWidth : 1,borderRadius:10,padding : 5 , color : activeChip === 'cancel' ? '#FFFF' : 'black',fontFamily : 'Inter-Bold',backgroundColor: activeChip === 'cancel' ? '#151E70' : '#D9D9D9',}} onPress={()=>chipHandler('cancel')}>cancel</Text>
                                <Text style={{borderWidth : 1,borderRadius:10,padding : 5 , color : activeChip === 'reschedule' ? '#FFFF' : 'black',fontFamily : 'Inter-Bold',backgroundColor: activeChip === 'reschedule' ? '#151E70' : '#D9D9D9',}} onPress={()=>chipHandler('reschedule')}>reschedule</Text>
                            </View>

                            {
                                !!data[0] ? (
                                    data?.map((ele, i) => {
                                        return (
                                            <UserMeetingCard ele={ele} key={i} activeChip={activeChip} cancelAppointMent={cancelAppointMent}/>
                                            )
                                    })
                                ) : (
                                    <View style={{alignItems : 'center' , marginTop :200}}>
                                        <Text style={{fontFamily : 'Inter-Bold',color : '#000000'}}>No Data to Show :(</Text>
                                    </View>
                                )
                            }
                    </ScrollView>
                        </View>
                    <Footer />
                </>
            )}
        </>
    );

}

export default UserScheduleDetails

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FFFF",
        flex: 1,
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row', // Arrange chips horizontally
        marginTop: 18,
        justifyContent: 'space-between', // Add this line to space chips evenly
    },
    chips: {
        borderRadius: 50,
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
        width: 106,
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 5,
        // Other styles as needed
    },

    chipText: {
        fontSize: 16,
        color: '#151E70',
        fontFamily: "Inter-Bold",
    },
    dropDownw: {
        marginTop: '2%',
        // borderWidth :1,
        borderRadius: 50
    },
    Heading: {
        fontSize: 25,
        marginLeft: 10,
        color: "#000000",
        fontFamily: "Inter-Bold",
        // marginLeft : 10  
    },
    input: {
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "gray",
        // borderRadius: RFPercentage(4),
        padding: RFPercentage(1.2),
        fontFamily: "Cabin-Regular",
        fontSize: RFPercentage(1.7),
        paddingLeft: RFPercentage(4),
        marginTop: RFPercentage(2),
    },
});
