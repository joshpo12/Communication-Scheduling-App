import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Modal, FlatList } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';
import t from 'tcomb-form-native';
import { firestore } from 'firebase';
//import selectedDay from './EventAgenda';

export default function ShowEvent({route, navigation}) {

    const [events, setEvents] = useState([]);

    const { chosenDay } = route.params;

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

    function handleRSVP() {
        firestore()
          .collection('calendarEvents')
          .doc(events.eventName)
          .update({
            rsvpCount: rsvpCount + 1
          })
          .then(() => {
            console.log('One person has RSVPed');
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
                <Text style={styles.title}>Events on {chosenDay}</Text>
                <FlatList
                    data={events}
                    keyExtractor={item => item._id}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({item}) => (
                    <List.Item
                        onPress={handleRSVP}
                        title={item.eventName}
                        description={item.eventTime}                        
                        // titleNumberOfLines={1}
                        // titleStyle={styles.listTitle}
                        // descriptionStyle={styles.listDescription}
                        descriptionNumberOfLines={2}
                    />
                    )}
                />
                {/* <Button title="RSVP to Event" onPress={handleRSVP(day.dateAndTime)}></Button> */}
                <Button title="Close Form" onPress={() => navigation.goBack()}></Button>
                </View>
              </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center' 
  }
})