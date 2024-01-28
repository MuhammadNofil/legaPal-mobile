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
const MeetingDetails = ({ navigation, route }) => {
    const { query } = route.params
    console.log(query)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const fetchAppointMentData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const response = await axios.get(`${baseUrl}appointement/getAllData?status=${query}`, {
                headers: {
                    Authorization: token
                }
            })
            response?.data?.data.map((ele)=>{
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
        console.log(data,'data')
    }, [])
    return (
        <>
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              <ScrollView>
                <View style={styles.mainContainer}>
                    {
                        !!data[0] ? (
                            data?.map((ele,i)=>{
                                return (
                                    <MeetingCardDetails ele={ele} key={i}/>
                                )
                            })
                        ) : (
                            <Text>No data to Show :(</Text>
                        )
                    }
                </View>
              </ScrollView>
              <LawyerFooter />
            </>
          )}
        </>
      );
      
}

            export default MeetingDetails

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
