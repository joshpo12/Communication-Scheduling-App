import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Modal, FlatList, Alert, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

export default function ShowEvent({route, navigation}) {

    const [events, setEvents] = useState([]);

    // chosen day from EventCalendar
    const { chosenDay } = route.params;

    // pulls events from firebase that match the selected calendar day
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('calendarEvents')
            .where('eventDate', '==', chosenDay)
            .onSnapshot(querySnapshot => {
                const events = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        eventName: '',
                        eventTime: '',
                        rsvpCount: '',
                    ...documentSnapshot.data()
                    }
                });
                setEvents(events);
            });
            return () => unsubscribe();
    }, []);

    // handle rsvp function (same as in EventCalendar)
    function handleRSVP(item) {
      firestore()
        .collection('calendarEvents')
        .doc(item._id)
        .update({
          rsvpCount: firebase.firestore.FieldValue.increment(1),
        })
        .then(() => {
          console.log('One person has RSVPed');
        });
        Alert.alert("You have successfully RSVPed!");
}

    return(
        <View>
          {/* creates sliding modal */}
            <Modal
              transparent={false}
              animationType={"slide"}
            >
              <View>
                <View style={{backgroundColor: "000000aa", margin: 50, padding: 40, borderRadius: 10}}>
                <Text style={styles.title}>Events on {chosenDay}</Text>

                {/* list of events for selected day (are selectable like events on EventCalendar) */}
                <FlatList
                    data={events}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({item}) => (
                    <List.Item
                        onPress={() => handleRSVP(item)}
                        title={item.eventName + ' - ' + item.eventTime}
                        description={'Current RSVPs: ' + item.rsvpCount}                        
                        descriptionNumberOfLines={2}
                    >
                    </List.Item>
                    )}
                />

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
  title: {
    fontSize: 25,
    textAlign: 'center' 
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