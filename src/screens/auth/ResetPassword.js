/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonLoader from "../../components/ActivityIndicator";
import axios from "axios";
import baseUrl from "../../constants";

const schema = yup.object().shape({
  email: yup.string().required("*Email is required").email("*Invalid email"),
});

export default function ResetPassword({ navigation }) {

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
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const { email } = data
    isloading(true)
    setButtonLoading(false)
    try {
      const response = await axios.post(`${baseUrl}auth/resetPassword`, data)
      console.log(response?.data?.status)
      if (response?.data?.status === 200) {
        isloading(false)
        setButtonLoading(true)
        navigation.navigate('ConfirmOtp', { email: email });
      }
    } catch (error) {
      console.log(error?.response?.data?.message, '??????')
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
      <Text style={styles.label}>Forget Password</Text>
      <Text style={styles.text}>Enter your Registered Email Address</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="example:user@gmail.com"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.warning}>{errors.email.message}</Text>}
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
    fontFamily: "Cabin-Regular",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  label: {
    color: '#051744',
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
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 25,
    padding: 7,
    fontFamily: "Cabin-Regular",
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
