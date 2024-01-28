/* eslint-disable prettier/prettier */
import { StyleSheet, Text, SafeAreaView, ScrollView, Pressable, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { TextInput } from 'react-native-gesture-handler'
import { RFPercentage } from 'react-native-responsive-fontsize'
import LawyerFooter from '../../components/LawyerFooter'
const dummyData = [
    { id: 1, text: 'Hello!', user: { id: 1, name: 'From' } },
    { id: 2, text: 'Hi there!', user: { id: 2, name: 'To' } },
    { id: 3, text: 'How are you?', user: { id: 1, name: 'From' } },
    { id: 4, text: "I'm doing well, thanks!", user: { id: 2, name: 'To' } },
    { id: 5, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 6, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 7, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 8, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 9, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 10, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 11, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 12, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 13, text: 'What about you?', user: { id: 1, name: 'From' } },
    { id: 14, text: 'What about you?', user: { id: 2, name: 'To' } },
    { id: 15, text: 'What about you?', user: { id: 2, name: 'To' } },
    { id: 16, text: 'What about you?', user: { id: 1, name: 'From' } },
    // Add more messages as needed
];
const LawyerRoom = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const onSendMessage = () => {
        if (inputText.trim() === '') {
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            user: { id: 1, name: 'User' }, // Assume the user ID is 1 for simplicity
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };
    const scrollViewRef = useRef();
    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView contentContainerStyle={{}}>
                <View style={{ backgroundColor: '#151E70', width: '100%', height: 70 }}>
                        <View style={{ display: 'flex', flexDirection: "row", margin: 20, gap: 20 }}>
                            <Image source={require('../../assets/images/Dummy.png')} style={{width : 40,height :40,borderRadius :30}} />
                            <Text style={{ color: '#FFFF', fontSize: 25 }}>John Doe</Text>
                        </View>
                    </View>

                    <SafeAreaView style={styles.mainContainer}>
                        <ScrollView
                            ref={scrollViewRef}
                            contentContainerStyle={styles.messagesContainer}
                            onContentSizeChange={scrollToBottom}
                        >
                            <View style={styles.container}>
                                <View style={styles.messagesContainer}>
                                    {dummyData?.map((item) => (
                                        <View
                                            key={item.id}
                                            style={item.user.id === 1 ? styles.toMessage : styles.fromMessage}>
                                            <Text style={styles.messageText}>{item.text}</Text>
                                        </View>
                                    ))}

                                </View>
                                <View style={styles.inputContainer}>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView>

            <TextInput
                style={styles.input}
                placeholder="Ask A Question"
                secureTextEntry={true}
            // onChangeText={(text) => setPassword(text)}
            // value={password}
            />
            <LawyerFooter></LawyerFooter>
        </>
    )
}

export default LawyerRoom

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 16,
    },
    fromMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#151E70',
        color: 'white',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '70%',
    },
    toMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#151E70',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '70%',
    },
    messageText: {
        fontSize: 16,
        color: "#FFFF"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: RFPercentage(4),
        paddingVertical: RFPercentage(1.2),
        paddingHorizontal: RFPercentage(4),
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(2),
        borderRadius: RFPercentage(4),
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: RFPercentage(1.7),
    },
    mainContainer: {
        // flex: 1,
        backgroundColor: 'red',
        marginBottom: 30
    },
    input: {
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "gray",
        borderRadius: RFPercentage(4),
        padding: RFPercentage(1.2),
        fontFamily: "Cabin-Regular",
        fontSize: RFPercentage(1.7),
        paddingLeft: RFPercentage(4),
        marginTop: RFPercentage(2),
        alignContent: 'center'
    },
    Title: {
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Inter-Bold',
    },
    cardImage: {
        height: 150,
        width: 150,
    },
    col: {
        alignItems: 'center', // Add this line to center the items
        borderWidth: 1,
        // ... other styles
    },
    app: {
        marginTop: 10,
        flex: 4, // the number of columns you want to devide the screen into
        marginHorizontal: 15,
        // margin : 10,
        // width: 200,
        // backgroundColor: "red",
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center'

    },
    row: {
        flexDirection: "row"
    },
    "1col": {
        // backgroundColor: "lightblue",
        // borderColor: "#fff",
        // borderWidth: 1,
        flex: 1
    },
    "2col": {
        // backgroundColor: "green",
        // borderColor: "#fff",
        // borderWidth: 1,
        flex: 2
    },
    "3col": {
        // backgroundColor: "orange",
        // borderColor: "#fff",
        borderWidth: 1,
        flex: 3
    },
    "4col": {
        // backgroundColor: "green/",
        // borderColor: "green",
        borderWidth: 1,
        flex: 4
    },
    mainContainer: {
        flex: 1,
    },
    heading: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: '#000000',
        marginLeft: 9
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row', // Arrange chips horizontally
        marginTop: 18,
        justifyContent: 'space-between', // Add this line to space chips evenly
    },
    chips: {
        borderRadius: 50,
        borderColor: '#D9D9D9',
        backgroundColor: '#D9D9D9',
        width: 106,
        alignItems: 'center',
        padding: 8,
        marginHorizontal: 5,
        // Other styles as needed
    },

    chipText: {
        fontSize: 16,
        color: '#151E70',
        fontFamily: "Inter-Bold",
    },
    topRated: {
        marginTop: 10,
        paddingHorizontal: 16, // Add horizontal padding to the content container
    },
    image: {
        borderRadius: 10, // Add borderRadius or any other styles as needed
    },
    imageTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        padding: 5,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },
    imageText: {
        color: '#fff',
        fontSize: 30,
    },
});
