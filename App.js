import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/Navigations/Navigation'
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
       <Navigation></Navigation> 
    </NavigationContainer>
    // <Text>Hello</Text>
  )
}

export default App

const styles = StyleSheet.create({})