/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/Footer';
import LawyerFooter from '../../components/LawyerFooter';
const LawyerNotifications = () => {
    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#151E70', }}>
                <SafeAreaView>
                    <View style={{ backgroundColor: '#151E70', width: '100%', height: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20,gap :10}}>
                            <Image source={require('../../assets/images/notification2.png')} style={{ marginTop: 4 }} />
                            <Text style={{ color: '#FFFF', fontSize: 25 }}>Notifications</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <SafeAreaView>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                <Image source={require("../../assets/images/Dummy.png")} style={{ width: 70, height: 70, borderRadius: 35 }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>john Has Set A meeting with you</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ backgroundColor: "yellow", height: 10, width: 10, borderWidth: 1, borderRadius: 20 }}></View>
                                        <Text style={{ marginLeft: 5, color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>1 Min ago</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 5, width: "100%", backgroundColor: "#FFFF" }}></View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                <Image source={require("../../assets/images/Dummy.png")} style={{ width: 70, height: 70, borderRadius: 35 }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>john Has Set A meeting with you</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ backgroundColor: "yellow", height: 10, width: 10, borderWidth: 1, borderRadius: 20 }}></View>
                                        <Text style={{ marginLeft: 5, color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>1 Min ago</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 5, width: "100%", backgroundColor: "#FFFF" }}></View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                <Image source={require("../../assets/images/Dummy.png")} style={{ width: 70, height: 70, borderRadius: 35 }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>john Has Set A meeting with you</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ backgroundColor: "yellow", height: 10, width: 10, borderWidth: 1, borderRadius: 20 }}></View>
                                        <Text style={{ marginLeft: 5, color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>1 Min ago</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 5, width: "100%", backgroundColor: "#FFFF" }}></View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                <Image source={require("../../assets/images/Dummy.png")} style={{ width: 70, height: 70, borderRadius: 35 }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>john Has Set A meeting with you</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ backgroundColor: "yellow", height: 10, width: 10, borderWidth: 1, borderRadius: 20 }}></View>
                                        <Text style={{ marginLeft: 5, color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>1 Min ago</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 5, width: "100%", backgroundColor: "#FFFF" }}></View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                                <Image source={require("../../assets/images/Dummy.png")} style={{ width: 70, height: 70, borderRadius: 35 }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>john Has Set A meeting with you</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <View style={{ backgroundColor: "yellow", height: 10, width: 10, borderWidth: 1, borderRadius: 20 }}></View>
                                        <Text style={{ marginLeft: 5, color: '#FFFF', fontSize: 14, fontFamily: "Inter-Bold" }}>1 Min ago</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 5, width: "100%", backgroundColor: "#FFFF" }}></View>
                        </SafeAreaView>

                    </ScrollView>
                </SafeAreaView>
            </ScrollView>
            <LawyerFooter />
        </>
    )
}

export default LawyerNotifications

const styles = StyleSheet.create({
    image: {
        // marginTop : 10,
        width: 150,
        height: 150,
        borderRadius: 100,
        marginRight: 15,
    },
    // marginTop: 15,
    //     height: 5,
    //     width: '100%',
    //     backgroundColor: '#FFFF'
})