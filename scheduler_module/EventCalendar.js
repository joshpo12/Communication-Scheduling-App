import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { firestore } from 'firebase';

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

return(
    <View style={styles.topPadding}>
        <Button
          onPress={() => navigation.navigate('AddEvent')}
          title="Add New Event">
        </Button>
        <Calendar 
          onDayPress={(day) => {navigation.navigate('ShowEvent', { chosenDay: day.dateString }), console.log('selectedDay: ', day.dateString)}}
        />
        <Text style={styles.upcomingEvents}>Upcoming Events: </Text>
        <FlatList
            data={events}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
              <List.Item
                  title={item.eventName}
                  description={item.eventDate, item.eventTime, item.rsvpCount}
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