/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/Signup'
import ResetPassword from '../screens/auth/ResetPassword'
import UpdatePassword from '../screens/auth/UpdatePassword'
import ConfirmOtp from '../screens/auth/ConfirmOTP';
import Profile from '../screens/others/Profile'
import Startpage from '../screens/others/Startpage'
import UserHome from '../screens/user/UserHome'
import FindLawyer from '../screens/user/FindLayer'
import CreateAppointment from '../screens/user/CreateAppointment'
import LawyerProfile from '../screens/user/LawyerProfile'
import { createStackNavigator } from "@react-navigation/stack";
import PaymentDetails from '../screens/others/PaymentDetails.js'
import UserProfile from '../screens/user/UserProfile.js'
import PersonalDetails from '../screens/others/PersonalDetails.js'
import ChatScreen from '../screens/others/ChatScreen.js'
import Notifications from '../screens/others/Notification.js'
import Room from '../screens/others/Room.js'
import ChatRoom from '../screens/others/ChatRoom.js'
import LawyerDashboard from '../screens/lawyer/LawyerDashboard.js'
import MeetingDetails from '../screens/lawyer/MettingDetails.js'
import LawyerPersonalDetails from '../screens/lawyer/LawyerPersonalDetails.js'
import LawyerRoom from '../screens/lawyer/LawyerRooms.js'
import LawyerSeeting from '../screens/lawyer/LawyerProfile.js'
import LawyerPersonalDetailss from '../screens/lawyer/LawyerPersonalDetails.js'
import LawyerNotifications from '../screens/lawyer/LawyerNotications.js'
import ChangePassword from '../screens/auth/ChangePassword.js'
import UserScheduleDetails from '../screens/user/UserScheduleDetails.js'
import UpdateProfile from '../screens/others/UpdateProfile.js'
const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Startpage">
      <Stack.Screen name="Startpage" component={Startpage} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={SignUp} options={{headerShown : false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown : true , title : 'Forget password'}} />
      <Stack.Screen name="updatePassword" component={UpdatePassword} options={{headerShown : false}}/>
      <Stack.Screen name="ConfirmOtp" component={ConfirmOtp} options={{headerShown : false}} />
      <Stack.Screen name="Profile" component={Profile} options={{headerShown : false}} />
      <Stack.Screen name="Userhome" component={UserHome} options={{headerShown : false}} />
      <Stack.Screen name="FindLawyer" component={FindLawyer} options={{headerShown : false}} />
      <Stack.Screen name="LawyerProfile" component={LawyerProfile} options={{headerShown : false}} />
      <Stack.Screen name="CreateAppointment" component={CreateAppointment} options={{headerShown : false}} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} options={{headerShown : false}} />
      <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown : false}} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{headerShown : false}} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown : false}} />
      <Stack.Screen name="Notifications" component={Notifications} options={{headerShown : false}} />
      <Stack.Screen name="Room" component={Room} options={{headerShown : false}} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} options={{headerShown : false}} />
      <Stack.Screen name="LawyerDashboard" component={LawyerDashboard} options={{headerShown : false}} />
      <Stack.Screen name="Meeting Details" component={MeetingDetails}  />
      <Stack.Screen name="Schedule Details" component={UserScheduleDetails}  />
      <Stack.Screen name="LawyerPersonalDetailss" component={LawyerPersonalDetailss} options={{headerShown : false}} />
      <Stack.Screen name="LawyerSeeting" component={LawyerSeeting} options={{headerShown : false}} />
      <Stack.Screen name="LawyerPersonalDetails" component={LawyerPersonalDetails} options={{headerShown : false}} />
      <Stack.Screen name="LawyerRoom" component={LawyerRoom} options={{headerShown : false}} />
      <Stack.Screen name="LawyerNotifications" component={LawyerNotifications} options={{headerShown : false}} />
      <Stack.Screen name="Change Password" component={ChangePassword} options={{headerShown : true}} />
      <Stack.Screen name="Update Profile" component={UpdateProfile} options={{headerShown : true}} />
    </Stack.Navigator>
  )
}

export default Navigation
