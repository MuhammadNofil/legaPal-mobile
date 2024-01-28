/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable , ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonLoader from "../../components/ActivityIndicator";
import axios from "axios";
import baseUrl from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";


const schema = yup.object().shape({
    currentPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
    newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
    confirmPassword: yup
    .string()
    .required('Confirm the Password')
    .oneOf([yup.ref('newPassword'), null], 'Password must Match'),
});

export default function ChangePassword({ navigation }) {

  const [loading, isloading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data)
    // const { email } = data
    isloading(true)
    setButtonLoading(false)
    try {
        const token = await AsyncStorage.getItem('token')
        console.log(token)
      const response = await axios.patch(`${baseUrl}auth/changePassword`, data , {
        headers : {
            Authorization: token
        }
      })
      console.log(response?.data?.status)
      if (response?.data?.status === 200) {
        console.log(response.data)
        isloading(false)
        setButtonLoading(true)
        // navigation.navigate('ConfirmOtp', { email: email });
      }
    } catch (error) {
      console.log(error?.response?.data, '??????')
      if (error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message)
        isloading(false)
        setButtonLoading(true)
        setError(true)
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Change Password</Text>
      
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="currentPassword"
      />
      {errors.currentPassword && <Text style={styles.warning}>{errors.currentPassword.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="newPassword"
      />
      {errors.newPassword && <Text style={styles.warning}>{errors.newPassword.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Re-enter New Password"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && <Text style={styles.warning}>{errors.confirmPassword.message}</Text>}
      {isError && <Text style={styles.error}>{errorMessage}</Text>}
      <Pressable style={styles.sendButton} onPress={handleSubmit(onSubmit)}>
        {buttonLoading && <Text style={styles.sendButtonText}>Send</Text>}
        {loading && <ButtonLoader></ButtonLoader>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  warning: {
    color: "red",
    fontSize: RFPercentage(1.7),
    marginTop: "2%",
    marginLeft: "13%",
    alignSelf: 'flex-start',
    fontFamily: "Inter-Bold",
  },
  error: {
    color: "red",
    fontSize: RFPercentage(2),
    marginTop : 5,
    fontFamily: "Inter-Bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    gap : 10
},
  label: {
    color: '#000000',
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(5),
    marginTop: RFPercentage(20),
  },
  text: {
    color: "#000000",
    fontFamily: "Inter-Bold",
    marginTop: RFPercentage(15),
    marginBottom: RFPercentage(4),
    fontSize: RFPercentage(2.2),
  },
  input: {
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 25,
    color : 'black',
    padding: 10,
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(1.5),
    paddingLeft: RFPercentage(3),
    marginTop: 10,
    width: "80%",
  },
  sendButton: {
    backgroundColor: "#051744",
    borderColor: "#051744",
    borderWidth: 2,
    padding: 7,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginTop: 22,
  },
  sendButtonText: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    color: "white",
    fontFamily: "Inter-Bold",
  },
});
