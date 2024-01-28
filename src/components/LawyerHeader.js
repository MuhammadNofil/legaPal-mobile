/* eslint-disable prettier/prettier */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
const LawyerHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.logoText} />
                {/* <Text style={styles.logoText}>LEGAL PAL</Text> */}
            </View>
            <View style={styles.rightContainer}>
                <Pressable onPress={()=> navigation.navigate('LawyerRoom')}>
                <Image source={require('../assets/images/vector3.png')} style={styles.icon} />
                </Pressable>
                <Pressable onPress={()=>navigation.navigate('LawyerNotifications')}>
                <Image source={require('../assets/images/notification.png')} style={styles.icon} />
                </Pressable>
                <Pressable onPress={()=> navigation.navigate('LawyerSeeting')}>
                <Image source={require('../assets/images/options.png')} style={styles.icon} />
                </Pressable>
            </View>
        </View>
    )
}

export default LawyerHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16, // Add padding to the sides
        alignItems: 'center', // Align items vertically
        padding  : 22
    },
    leftContainer: {
        // backgroundColor: "blue",
        flex: 1, // Take the available space
    },
    rightContainer: {
        // backgroundColor: "blue",
        flexDirection: 'row', // Icons in the same row
        alignItems: 'center', // Center icons vertically
    },
    logoText: {
        // width: '90%',
        // height : '2%',
        // backgroundColor: 'green',
        // fontSize: 18,
        // fontWeight: 'bold',
    },
    icon: {
        marginLeft: 22, // Add some space between the icons
    },
});
