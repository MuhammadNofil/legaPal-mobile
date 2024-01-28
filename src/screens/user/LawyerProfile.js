/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Card from '../../components/Card'
// import card from '../../components/card';
import Card from '../../components/Card';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DetailCard from '../../components/DetailCard';
import About from '../../components/About';
import axios from 'axios';
import baseUrl from '../../constants';
import PageLoader from '../../components/PageLoader';
const LawyerProfile = ({ navigation, route }) => {
    const { id } = route.params
    console.log(id)
    console.log(route)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})

    const fetchLawyer = async () => {
        try {
            const response = await axios.get(`${baseUrl}lawyer/${id}`)
            if (response?.data?.status === 200) {
                setData(response?.data?.data)
                console.log(response?.data?.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error?.response?.data)

        }
    }
    useEffect(() => {
        fetchLawyer()
    }, [])
    return (
        <>
            {
                isLoading ? (<PageLoader />) : (
                    <>
                        <Header />
                        <ScrollView style={styles.mainContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/landmark.png')} />
                                    <Text style={styles.Heading}>Lawyer Profile</Text>
                                </View>
                            </View>
                            <SafeAreaView >
                                <DetailCard data={data} />
                                <About data={data} />
                                <View style={{ margin: 10 }}>
                                    <Pressable style={styles.footer}  onPress={() => navigation.navigate('CreateAppointment',{data : data})}>
                                        <Text style={styles.footerItem}>Book an Appointment</Text>
                                    </Pressable>
                                </View>
                            </SafeAreaView>
                        </ScrollView>
                        <Footer />
                    </>
                )
            }
        </>
    )
}

export default LawyerProfile

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FFFF",
        flex: 1,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#151E70",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '100%',
    },
    footerItem: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: "Inter-Bold",
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
});
