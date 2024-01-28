/* eslint-disable prettier/prettier */
// Navigation.js
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LawyerFooter({}) {
  const navigation = useNavigation();

  const navButtons = [
    { icon: require("../assets/images/vector4.png"), screenName: "LawyerDashboard" },
    // { icon: require("../assets/images/vector2.png"), screenName: "FindLawyer" },
    { icon: require("../assets/images/vector3.png"), screenName: "ChatScreen" },
    { icon: require("../assets/images/vector1.png"), screenName: "LawyerPersonalDetails" },
    // {
    //   icon: require("../assets/wallet.png"),
    //   screenName: "Wallet",
    // },
  ];

  return (
    <View style={styles.navigationBar}>
      {navButtons.map(({ icon, screenName }, index) => (
        <NavButton key={index} icon={icon} screenName={screenName} navigation={navigation} />
      ))}
    </View>
  );
}

const NavButton = ({ icon, screenName, navigation }) => {
  const handlePress = () => {
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={icon} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    navigationBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#ffff",
      width : '100%',
      borderTopEndRadius : 40,
      borderTopLeftRadius : 40,
      padding : 10
    },
    buttonContainer: {
      flex: 1,
      alignItems: "center",
      padding: 15,
    },
    buttonImage: {
    //   width: 25,
    //   height: 25,
    },
  });
  