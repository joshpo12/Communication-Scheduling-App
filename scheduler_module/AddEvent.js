import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { firestore } from 'firebase';

export default function AddEvent({navigation}) {

    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    // function to add new event to firebase under calendarEvents collection
    function handleButtonPress() {
        firestore()
          .collection('calendarEvents')
          .add({
            eventName: eventName,
            eventDate: eventDate,
            eventTime: eventTime,
            rsvpCount: 0
          })
          .then(() => {
            navigation.goBack();
          });
    }

    //return anything to be seen on screen using "<View>" and other react native components
    return(
        <View>
          {/* creates sliding modal */}
            <Modal
              transparent={false}
              animationType={"slide"}
            >
              <View>
                <View style={{backgroundColor: "000000aa", margin: 50, padding: 40, borderRadius: 10}}>
                    <Text style={styles.instructions}>Please Enter the Following Information: </Text>

                    {/* form to add new event */}
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Event Name</Text>
                        <TextInput
                            autoCapitalize="none"
                            style={styles.input}
                            value = {eventName}
                            onChangeText={text => setEventName(text)}
                        />  
                    </View>  

                    <View style={styles.form}>
                      {/* 2021-03-17 */}
                        <Text style={styles.inputTitle}>Event Date(YYYY-MM-DD)</Text>
                        <TextInput
                            autoCapitalize="none"
                            style={styles.input}
                            value = {eventDate}
                            onChangeText={date => setEventDate(date)}
                        />  
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Event Time</Text>
                        <TextInput
                            autoCapitalize="none"
                            style={styles.input}
                            value = {eventTime}
                            onChangeText={time => setEventTime(time)}
                        />  
                    </View>

                    {/* button to add new event to firebase */}
                    <TouchableOpacity
                        style = {styles.submitFormButton}
                        activeOpacity = {.5}
                        onPress = {handleButtonPress}
                        >
                            <Text style = {styles.buttonText}> Create New Event</Text>
                    </TouchableOpacity>
                    
                    {/* button to close form */}
                    <TouchableOpacity
                        style = {styles.submitFormButton}
                        activeOpacity = {.5}
                        onPress = {() => navigation.goBack()}
                        >
                            <Text style = {styles.buttonText}> Close Form</Text>
                    </TouchableOpacity>

                </View>
                </View>
            </Modal>
        </View>
    )
}

// css to style buttons and text
const styles = StyleSheet.create({
  inputTitle:{
    color: "#8A8F9E",
    textTransform: "uppercase"
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  input:{
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  instructions: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 25
  },
  submitFormButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#F5B0C2',
    borderRadius: 30,
    borderColor: '#fff'
  },
  buttonText: {
    marginTop: 10,
    textAlign: 'center'
 }
})