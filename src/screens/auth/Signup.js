/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonLoader from "../../components/ActivityIndicator";
import axios from "axios";
import baseUrl from "../../constants";

export default function Signup({ navigation }) {

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters'),
    userName: yup.string()
      .required('Username is Required')
      .min(8, 'Username must contain at least 8 Characters'),
    confirmpassword: yup
      .string()
      .required('Confirm the Password')
      .oneOf([yup.ref('password'), null], 'Password must Match'),
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
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
      password: "",
      userName: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (formData) => {
    console.log(formData)
    const { email, userName, password, confirmPassword } = formData
    const data = { email, password, userName }
    isloading(true)
    setButtonLoading(false)
    try {
      const response = await axios.post(`${baseUrl}auth/signup`, data)
      console.log(response?.data?.status)
      if (response?.data?.status === 200) {
        isloading(false)
        setButtonLoading(true)
        navigation.navigate('Profile', { userId: response?.data?.data?._id });}
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.registerHeading}>Welcome OnBoard</Text>
      <Text style={styles.subHeading}>lets help you meet up your task</Text>
      <View style={styles.formContainer}>
        <Text style={styles.placeholder}>Email</Text>
        <Controller control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && <Text style={styles.warning}>{errors.email.message}</Text>}
        <Text style={styles.placeholder}>User Name</Text>
        <Controller control={control}
          rules={{ required: true, }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter a Username"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="userName"
        />
        {errors.name && <Text style={styles.warning}>{errors.name.message}</Text>}
        <Text style={styles.placeholder}>Password</Text>
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
        <Text style={styles.placeholder}>Confirm Password</Text>
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
        <TouchableOpacity style={styles.buttonregister} onPress={handleSubmit(onSubmit)} disabled={loading ? true : false}>
          {buttonLoading && <Text style={styles.button} >Signup</Text>}
          {loading && <ButtonLoader />}
        </TouchableOpacity>
        <Text style={styles.tag} onPress={() => navigation.navigate('Login')}>Already have a account? Login</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",

  },
  placeholder: {
    top: '5%',
    left: '3%',
    fontSize: RFPercentage(2),
    fontFamily: "Inter-Bold",
    color: '#051744',
  },
  tag: {
    marginTop: "5%",
    marginLeft: "18%",
    fontSize: RFPercentage(2),
    color: '#051744',
    fontFamily: "Inter-Bold",

    // alignItems : 'center',
    // justifyContent : 'center'
  },
  registerHeading: {
    fontFamily: "Inter-Bold",
    color: '#051744',
    textAlign: "center",
    fontSize: RFPercentage(5),
    marginBottom: '2%',
  },
  subHeading: {
    fontFamily: "Inter-Bold",
    color: '#051744',
    marginBottom: '2%',
    marginTop: "2%",
    fontSize: RFPercentage(2),

  },
  error: {
    fontFamily: "Inter-Bold",
    color: 'red',
    marginBottom: '2%',
    marginTop: "2%",
    fontSize: RFPercentage(2),
    marginLeft: 70,
    marginTop: 10
  },
  formContainer: {
    width: "80%",
  },
  input: {
    fontFamily: "Inter-Bold",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    padding: RFPercentage(1),
    backgroundColor: 'white',
    fontSize: RFPercentage(1.7),
    paddingLeft: 20,
    marginTop: "9%",
  },
  buttonregister: {
    backgroundColor: "#051744",
    borderColor: "#051744",
    borderWidth: 2,
    padding: RFPercentage(1.5),
    borderRadius: 25,
    alignItems: "center",
    marginTop: "13%",
  },
  button: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    color: "white",
    fontFamily: "Inter-Bold",
  },
  warning: {
    color: "#E8505B",
    fontSize: RFPercentage(1.5),
    paddingTop: "1%",
    paddingLeft: 9,
  }
});
