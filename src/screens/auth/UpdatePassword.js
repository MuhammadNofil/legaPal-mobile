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
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
  confirmpassword: yup
    .string()
    .required('Confirm the Password')
    .oneOf([yup.ref('password'), null], 'Password must Match'),
});

export default function UpdatePassword({ navigation,route }) {
  const {email} = route.params
  const [loading, isloading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const onSubmit = async (formData) => {
    console.log(formData)
    const {  password, confirmPassword } = formData
    const data = { email, password, confirmPassword }
    isloading(true)
    setButtonLoading(false)
    try {
      const response = await axios.patch(`${baseUrl}auth/updatePassword`, data)
      console.log(response?.data?.status)
      if (response?.data?.status === 200) {
        isloading(false)
        setButtonLoading(true)
        navigation.navigate('Login');
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      confirmPassword: "",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Password</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Enter New Password</Text>
        <Controller control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              onChangeText={onChange}
              value={value}
            />)}
          name="password"
        />
        {errors?.password && <Text style={styles.warning}>{errors?.password.message}</Text>}
        <Text style={styles.label}>Confirm New Password</Text>
        <Controller control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirm The Password"
              secureTextEntry={true}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="confirmpassword"
        />
        {errors?.confirmpassword && <Text style={styles.warning}>{errors?.confirmpassword.message}</Text>}
        {isError && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        {buttonLoading && <Text style={styles.buttonText}>Submit</Text>}
        {loading && <ButtonLoader></ButtonLoader>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "#051744",
    fontFamily: "Inter-Bold",
    marginTop: RFPercentage(15),
    fontSize: RFPercentage(4),
  },
  labelContainer: {

    width: "80%",
    marginTop: RFPercentage(4),
  },
  label: {
    color: "#000000",
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(2.2),
    marginBottom: RFPercentage(3),
    marginTop: RFPercentage(4),
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 25,
    padding: RFPercentage(0.5),
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(2),
    paddingLeft: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#051744",
    padding: RFPercentage(1.5),
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    marginTop: RFPercentage(5),
  },
  buttonText: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    color: "white",
    fontFamily: "Inter-Bold",
  },
  errorText: {
    color: "red",
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(0.5),
    marginLeft: RFPercentage(1.3),
  },
});
