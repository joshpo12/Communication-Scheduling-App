import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { firestore } from 'firebase';
import * as firebase from 'firebase';
import { CurrentRenderContext } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


export default function EventCalendar({navigation}) {

    const [events, setEvents] = useState([]);
    const currentUser = firebase.auth().currentUser;
    const isFocused = useIsFocused();

    // firebase to get events from calendarEvents collection
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('calendarEvents')
            .onSnapshot(querySnapshot => {
                const events = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        attendees: '',
                        eventName: '',
                        eventDate: '',
                        eventTime: '',
                        rsvpCount: '',
                        ...documentSnapshot.data()
                    }
                });
                setEvents(events);
            });
            return () => unsubscribe();
    }, [isFocused]);

    // method to add new rsvp to rsvpCount and push to firebase
    function handleRSVP(item) {
        firestore()
          .collection('calendarEvents')
          .doc(item._id)
          .update({
            rsvpCount: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            firestore()
              .collection('Users')
              .doc(currentUser.uid)
              .update({
                userEvents: firestore.FieldValue.arrayUnion(item._id)
              })
            console.log(item.attendees.length);
            console.log('One person has RSVPed');
          });
          Alert.alert("You have successfully RSVPed!");
  }

return(
    <View>
        <Calendar 
          onDayPress={(day) => {navigation.navigate('ShowEvent', { chosenDay: day.dateString }), console.log('selectedDay: ', day.dateString)}}
        />
        <Text style={styles.topText}>Click on a date to see scheduled events by day</Text>
        {/* button leading to form to add a new event */}
        <TouchableOpacity style={styles.editProfileBtn} activeOpacity = {.5} 
            onPress={()=> navigation.navigate('AddEvent')}>
                <Text style={styles.buttonText}>Add a New Event</Text>
            </TouchableOpacity>
        <Text style={styles.upcomingEvents}>Upcoming Events: </Text>
        <Text style={styles.RsvpToEvents}>Click on an event to RSVP</Text>

        {/* list of events from firebase */}
        <FlatList
            contentContainerStyle={{paddingBottom:550}}
            scrollEnabled='true'
            data={events}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
              // when event is pressed, handleRSVP method is called
              <List.Item
                  onPress={() => handleRSVP(item)}
                  title={item.eventName}
                  description={item.eventDate + ' at ' + item.eventTime + ' \nCurrent RSVPs: ' + item.rsvpCount}
                  titleNumberOfLines={1}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                  descriptionNumberOfLines={2}
              />
            )}
        />
    </View>
)

}

// css to style buttons and text
const styles = StyleSheet.create({
    upcomingEvents: {
      fontSize: 25,
      textAlign: 'center',
      paddingTop: 20
    },
    RsvpToEvents: {
      fontSize: 15,
      textAlign: 'center',
      paddingTop: 20
    },
    item: {
      backgroundColor: "white",
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
    },
    editProfileBtn: {
      alignItems: 'center',
      marginTop: 10,
      paddingTop: 15,
      paddingBottom: 15,
      marginLeft: 145,
      marginRight: 145,
      backgroundColor: '#E1B426',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#fff'
  },
  buttonText: {
      textAlign: 'center'
  },
  topText: {
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  });