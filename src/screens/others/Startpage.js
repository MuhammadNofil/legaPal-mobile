import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Startpage = ({navigation}) => {
    setTimeout(()=>{
        navigation.navigate('Login')
    },3000)
  return (
    <ImageBackground source={require('../../assets/images/start.png')} style={styles.backGround}>
    </ImageBackground>
  )
}

export default Startpage

const styles = StyleSheet.create({
    backGround : {
        flex : 1,
        // opacity : 1.
    },
})