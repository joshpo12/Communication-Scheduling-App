import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Modal, FlatList, Alert } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

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
                        onPress={() => handleRSVP(item)}
                        title={item.eventName + ' - ' + item.eventTime}
                        description={'Current RSVPs: ' + item.rsvpCount}                        
                        // titleNumberOfLines={1}
                        // titleStyle={styles.listTitle}
                        // descriptionStyle={styles.listDescription}
                        descriptionNumberOfLines={2}
                    >
                    </List.Item>
                    )}
                />
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