import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Modal, FlatList, DateObject } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import t from 'tcomb-form-native';
import { firestore } from 'firebase';
import { firebase } from '../database/firebase';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function EventCalendar({navigation}) {

    const selectedDay = new Date();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('calendarEvents')
            .onSnapshot(querySnapshot => {
                const events = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        eventName: '',
                        dateAndTime: '',
                    ...documentSnapshot.data()
                    }
                });
                setEvents(events);
            });
            return () => unsubscribe();
    }, []);

    function getCurrentDate() {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    }

return(
    <View>
        {/* Click on day and modal sorts by dateAndTime and displays events for that day, with option to RSVP for event */}
        <Calendar 
          onDayPress={(day) => {navigation.navigate('ShowEvent', { chosenDay: day.dateString }), console.log('selectedDay: ', day.dateString)}}
        />
        <Button
          onPress={() => navigation.navigate('AddEvent')}
          title="Add New Event">
        </Button>
        <Text>Upcoming Events: </Text>
        <FlatList
            data={events}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
              <List.Item
                  title={item.eventName}
                  description={item.eventDate, item.eventTime}
                  // titleNumberOfLines={1}
                  // titleStyle={styles.listTitle}
                  // descriptionStyle={styles.listDescription}
                  // descriptionNumberOfLines={1}
              />
            )}
        />
    </View>
)

}

const styles = StyleSheet.create({
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