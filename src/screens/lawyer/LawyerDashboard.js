/* eslint-disable prettier/prettier */
import { SafeAreaView, StyleSheet, View, Text, Image, Pressable } from "react-native";
// import BarChartofOrders from "./BarChart";
import { RFPercentage } from "react-native-responsive-fontsize";
// import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';
import BarChartofOrders from "../../components/BarChart";
// import NavBar from "./Navigation";
import LawyerFooter from "../../components/LawyerFooter";
import PageLoader from "../../components/PageLoader";
import axios from "axios";
import baseUrl from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LawyerHeader from "../../components/LawyerHeader";

export default function LawyerDashboard({ navigation }) {

    const [isLoading, setLoading] = useState(true)

    const gradientSettings = {
        colors: ["#FF8790", "#E8505B"],
        start: { x: 0.5, y: 0 },
        end: { x: 0.3, y: 1 },
    };

    const boxesData = [
        {
            imageSource: "group",
            outsideText: "Meeting Attended",
            query: 'completed'
        },
        {
            imageSource: "calendar",
            outsideText: "Upcoming Meeting",
            query: 'pending'
        },
        {
            imageSource: "times",
            outsideText: "Cancelled Mettings",
            query: 'cancel'
        },
        {
            imageSource: "calendar-o",
            // insideText: "174",
            outsideText: "Reschedule Requests",
            query: 'reschedule'
        },
    ];
    const [data, setData] = useState(boxesData)
    const [graphData, setGraphData] = useState([])
    const getCountData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            const response = await axios.get(`${baseUrl}lawyer/dashboard`, {
                headers: {
                    Authorization: token
                }
            })
            if (response?.data?.status === 200) {
                setLoading(false)
                const a = response?.data?.data;

                const lowercaseKeys = Object.keys(a).reduce((acc, key) => {
                    acc[key] = a[key];
                    return acc;
                }, {});

                const newData = data.map((ele) => {
                    const query = ele.query.toLowerCase();
                    if (lowercaseKeys.hasOwnProperty(query)) {
                        ele.count = lowercaseKeys[query];
                    }
                    return ele;
                });
                setData(newData)
                setGraphData(response?.data?.data?.graph)
            }
        } catch (error) {
            console.log(error?.response?.data)
            isLoading(false)
        }
    }

    useEffect(() => {
        getCountData()
    }, [])

    return (
        <>
            {
                isLoading ? (<PageLoader />) : (
                    <>
                        <LawyerHeader />
                        <SafeAreaView style={{ flex: 1 }}>
                            <ScrollView>
                                <BarChartofOrders graphData={graphData}/>
                                <Pressable style={styles.boxcontainer} >
                                    {data.map((box, index) => (
                                        <Pressable key={index} style={styles.boxWrapper} onPress={() => navigation.navigate('Meeting Details', { query: box?.query })}>
                                            <View style={styles.box}>
                                                <Icon name={box?.imageSource} size={40} color="#FFFF" />
                                                <Text style={styles.insideText}>{box.count}</Text>
                                            </View>
                                            <Text style={styles.outsideText}>{box.outsideText}</Text>
                                            {index % 2 === 1 && <View style={styles.rowSeparator} />}
                                        </Pressable>
                                    ))}
                                </Pressable>
                            </ScrollView>
                        </SafeAreaView>
                        <LawyerFooter></LawyerFooter>
                    </>
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        height: "100%",
        width: "100%",
        paddingBottom: "6%",
    },
    header: {
        backgroundColor: "#E8505B",
        height: RFPercentage(10),
        width: "100%",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: "10%",
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 8,
    },

    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: RFPercentage(2),
    },
    settingsIcon: {
        width: RFPercentage(3.5),
        height: RFPercentage(3.5),
        // Add any additional styling for the settings icon
    },
    headertext: {
        fontSize: RFPercentage(3.5),
        color: "white",
        fontFamily: "Futura_20Medium_20BT",
    },
    head: {
        fontSize: RFPercentage(3),
        fontFamily: "Futura_20Medium_20BT",
        marginVertical: RFPercentage(2),
        left: "4%",
    },
    // 2 gradient boxes in each row
    boxcontainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    boxWrapper: {
        width: "50%", // Set the width to occupy 48% of the container (allowing for some spacing)
        alignItems: "center",
        marginBottom: RFPercentage(4), // Adjust as needed
    },
    box: {
        backgroundColor: "#051744",
        margin: 5,
        width: "80%", // Set the width to occupy 48% of the container (allowing for some spacing)
        height: RFPercentage(18),
        borderRadius: RFPercentage(2),
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 60,
        height: 60,
    },
    insideText: {
        marginTop: RFPercentage(2),
        fontSize: RFPercentage(2.1),
        color: "white",
        fontFamily: "Futura_20Medium_20BT",
        fontWeight: "bold",
    },
    outsideText: {
        fontFamily: "Inter-Bold",
        color: '#051744',
        marginTop: RFPercentage(1),
        fontSize: RFPercentage(1.7),
        textAlign: "center",
    },
});
