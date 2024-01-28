/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const ConfirmationModal = ({modalVisible,setModalVisible , getAccountCredentials,price}) => {
//   const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are You Sure You want to create an appointment?</Text>
            <Text style={styles.modalText}>this appointment will charge you {price} Rs</Text>
            <View style={{flexDirection:'row' , gap : 15}}>
            <Pressable
              style={[styles.button1, styles.buttonClose1]}
              onPress={getAccountCredentials}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2
  },
  button1: {
    borderRadius: 20,
    padding: 15,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: 'black',
  },
  buttonClose: {
    backgroundColor: '#8a120a',
  },
  buttonClose1: {
    backgroundColor: '#051744',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color : "#000000",
    fontFamily :"Inter-Bold"
  },
});

export default ConfirmationModal;


