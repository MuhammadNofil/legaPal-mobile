/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import ButtonLoader from "../../components/ActivityIndicator";
import axios from "axios";
import baseUrl from "../../constants";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, isloading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup
      .string()
      .required('Password is required')
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData)
    isloading(true)
    setButtonLoading(false)
    try {
      const response = await axios.post(`${baseUrl}auth/login`, formData)
      if (response?.data?.token) {
        try {
          const tokenString = JSON.stringify(response?.data?.token);
          await AsyncStorage.setItem('token', tokenString);
        } catch (error) {
          console.log(error)
        }
      }
      if (response?.data?.status === 200 && response?.data?.data?.role === null) {
        isloading(false)
        setButtonLoading(true)
        navigation.navigate('Profile', { userId: response?.data?.data?._id });
      } else if (response?.data?.status === 200 && response?.data?.data?.role === "lawyer" && response?.data?.data?.accountDetails !== false) {
        isloading(false)
        setButtonLoading(true)
        navigation.navigate('LawyerDashboard', { user: response?.data?.data });
      } else if (response?.data?.status === 200 && response?.data?.data?.role === "user" && response?.data?.data?.accountDetails !== false) {
        isloading(false)
        setButtonLoading(true)
        navigation.navigate('Userhome', { user: response?.data?.data });
      } else if (response?.data?.status === 200 && response?.data?.data?.accountDetails === false) {
        isloading(false)
        setButtonLoading(true)
        navigation.navigate('PaymentDetails', { user: response?.data?.data });
      }
    } catch (error) {
      console.log(error?.response?.data?.message, 'error')
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
      <View>
      </View>
      <View>
        <Text style={styles.loginHeading}>Login</Text>
        <Image source={require("../../assets/images/bg.png")} style={styles.abc} />
      </View>
      <View style={styles.formContainer}>

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
        {isError && <Text style={styles.error}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.forgotPassword} >
          <Text style={styles.forgotPasswordText} onPress={()=> navigation.navigate('ResetPassword')}>Forgot Password?</Text>
        </TouchableOpacity>
        <Pressable style={styles.buttonLogin} onPress={handleSubmit(onSubmit)}>
          {buttonLoading && <Text style={styles.button}>Login</Text>}
          {loading && <ButtonLoader />}
        </Pressable>
        <View style={styles.signupContainer}>
          <Text style={styles.signupTextLeft}>Don't have an account?</Text>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText} onPress={()=>navigation.navigate('Signup')}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: RFPercentage(5), 
  },
  loginHeading: {
    // top : RFPercentage(6),
    color: '#051744',
    fontFamily: "Inter-Bold",
    textAlign: "center", // Align text to the left
    fontSize: RFPercentage(6), // Responsive font size
  },
  formContainer: {
    top: RFPercentage(6),
    width: "80%",
  },
  input: {
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: RFPercentage(4),
    padding: RFPercentage(1.2),
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(1.7),
    paddingLeft: RFPercentage(4),
    marginTop: RFPercentage(2),
    color : 'black'
  },
  
  forgotPassword: {
    fontFamily: "Inter-Bold",
    alignSelf: "flex-end",
    marginTop: RFPercentage(1),
    color: '#051744',
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
  forgotPasswordText: {
    fontFamily: "Inter-Bold",
    color: "#051744",
    textDecorationLine: "none",
    fontSize: RFPercentage(1.8), // Responsive font size
  },
  buttonLogin: {
    fontFamily: "Inter-Bold",
    backgroundColor: "#051744",
    borderColor: "#051744",
    borderWidth: 2,
    padding: RFPercentage(1.5), // Responsive padding
    borderRadius: RFPercentage(4), // Responsive border radius
    alignItems: "center",
    marginTop: RFPercentage(2), // Responsive margin top
  },
  button: {
    textAlign: "center",
    fontSize: RFPercentage(2.3), // Responsive font size
    color: "white",
    fontFamily: "Inter-Bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center", // Align to the center
    marginTop: RFPercentage(3), // Responsive margin top
  },
  signupTextLeft: {
    color: '#051744',
    fontFamily: "Inter-Bold",
    fontSize: RFPercentage(2), // Responsive font size
    color: "black", // or any color you prefer
    marginRight: RFPercentage(1), // Responsive margin right
  },
  signupButton: {
    padding: 0, // Remove padding
  },
  signupButtonText: {
    textAlign: "center",
    fontSize: RFPercentage(2), // Responsive font size
    color: "#051744", // Red color
    fontFamily: "Inter-Bold",
  },
  abc: {
    top: RFPercentage(4),
    // color : "black"
    // height : "50%",
    // width : "80%"
  }
});
