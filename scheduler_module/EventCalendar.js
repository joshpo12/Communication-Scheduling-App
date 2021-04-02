import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList, Alert } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

export default function EventCalendar({navigation}) {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('calendarEvents')
            .onSnapshot(querySnapshot => {
                const events = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
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
    }, []);

    function handleRSVP(item) {
      if (item.hasRsvped == false) {
        firestore()
          .collection('calendarEvents')
          .doc(item._id)
          .update({
            rsvpCount: firebase.firestore.FieldValue.increment(1),
            hasRsvped: true
          })
          .then(() => {
            console.log('One person has RSVPed');
          });
          Alert.alert("You have successfully RSVPed!");
          return;
      } else {
        firestore()
          .collection('calendarEvents')
          .doc(item._id)
          .update({
            rsvpCount: firebase.firestore.FieldValue.increment(-1),
            hasRsvped: false
          })
          .then(() => {
            console.log('One person has cancelled their RSVP');
          });
          Alert.alert("You have cancelled your RSVP");
          return;
      }
    }

return(
    <View style={styles.topPadding}>
        <Calendar 
          onDayPress={(day) => {navigation.navigate('ShowEvent', { chosenDay: day.dateString }), console.log('selectedDay: ', day.dateString)}}
        />
        <Button
          onPress={() => navigation.navigate('AddEvent')}
          title="Add New Event">
        </Button>
        <Text style={styles.upcomingEvents}>Upcoming Events: </Text>
        <FlatList
            scrollEnabled='true'
            data={events}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
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

const styles = StyleSheet.create({
    topPadding: {
      paddingTop: 50
    },
    upcomingEvents: {
      fontSize: 25,
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
    }
  });