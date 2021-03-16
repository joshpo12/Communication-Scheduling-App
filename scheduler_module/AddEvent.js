import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Modal, FlatList, TextInput } from 'react-native';
import { firestore } from 'firebase';

export default function AddEvent({navigation}) {

    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

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

    return(
        <View>
            <Modal
              transparent={false}
              animationType={"slide"}
            >
              <View>
                <View style={{backgroundColor: "000000aa", margin: 50, padding: 40, borderRadius: 10}}>

                    <View >
                        <Text >Event Name</Text>
                        <TextInput
                            autoCapitalize="none"
                            // style={styles.input}
                            value = {eventName}
                            onChangeText={text => setEventName(text)}
                        />  
                    </View>  

                    <View>
                      {/* 2021-03-17 */}
                        <Text >Event Date</Text>
                        <TextInput
                            autoCapitalize="none"
                            // style={styles.input}
                            value = {eventDate}
                            onChangeText={date => setEventDate(date)}
                        />  
                    </View>

                    <View>
                      {/* 2021-03-17 */}
                        <Text >Event Time</Text>
                        <TextInput
                            autoCapitalize="none"
                            // style={styles.input}
                            value = {eventTime}
                            onChangeText={time => setEventTime(time)}
                        />  
                    </View>

                <Button title="Create New Event" onPress={handleButtonPress}></Button>
                <Button title="Close Form" onPress={() => navigation.goBack()}></Button>
                </View>
                </View>
            </Modal>
        </View>
    )
}