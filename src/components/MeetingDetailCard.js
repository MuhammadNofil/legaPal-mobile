/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";


const MeetingCardDetails = ({ele}) => {
    console.log(ele,'sasas')
    return (
        <>
            <View style={styles.cardContainer}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/Dummy.png')}
                        style={styles.image}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.name}>{ele?.user?.userName}</Text>
                        {/* <Text style={styles.experience}>{ele?.medium}</Text> */}
                        {/* <Text style={styles.experience}> pending</Text> */}
                        <Text style={styles.experience}>
                            <Icon name="map-marker" size={20} color="#151E70" /> {ele?.user?.city}
                        </Text>
                    </View>
                </View>
                <View style={styles.divider}></View>

                <View style={styles.details}>
                    <View style={styles.detailColumn}>
                        <Icon name="phone" size={20} color="#151E70" />
                        <Text style={styles.detailItem}>{ele?.medium}</Text>
                    </View>
                    <View style={styles.detailColumn}>
                        <Icon name="envelope" size={20} color="#151E70" />
                        <Text style={styles.detailItem}>{ele?.user?.email}</Text>
                    </View>
                </View>
                <View style={styles.details}>
                    <View style={styles.detailColumn}>
                        <Icon name="calendar" size={20} color="#151E70" />
                        <Text style={styles.detailItem}>{new Date(ele?.date).toISOString().split('T')[0]}</Text>
                    </View>
                    <View style={styles.detailColumn}>
                        <Icon name="clock-o" size={20} color="#151E70" />
                        <Text style={styles.detailItem}>{ele?.time}</Text>
                    </View>
                </View> 
               
               
            </View>
        </>
    );

}

export default MeetingCardDetails

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F3F2F2',
        borderWidth: 1,
        // borderRadius: 10,
        // elevation: 3,
        margin: 10,
        padding: 15,
        marginTop: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        marginTop: 15,
        height: 5,
        width: '100%',
        backgroundColor: '#FFFF'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 15,
    },
    headerText: {
        flex: 1,
        marginLeft: 25,
    },
    name: {
        fontSize: 30,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    experience: {
        fontSize: 16,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    details: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailColumn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailItem: {
        fontSize: 16,
        marginLeft: 5,
        color: "#151E70",
        fontFamily: "Inter-Bold"
    },
    footer: {
        marginTop: 10,
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
    }
})