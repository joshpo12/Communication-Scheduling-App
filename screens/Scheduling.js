import React, { Component, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button, Alert, Modal, FlatList } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import firebase from '../database/firebase';
import t from 'tcomb-form-native';
import { firestore } from 'firebase';
const Form = t.form.Form;
const events = [];
const Event = t.struct({
  EventName: t.String,
  DateAndTime: t.Date
})
const getCurrentDate=()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}
function getCalendarEvents() {
  useEffect(() => {
    console.log('I am here');
    firestore()
    .collection('calendarEvents')
    .orderBy('dateAndTime')//whatever order necessary
    .onSnapshot(querySnapshot => {
      console.log("here");
        events /*taken from above*/ = querySnapshot.docs.map(documentSnapshot => {
        //pulls data from collection
        return {
          _id: documentSnapshot.id,
          name: '',
        ...documentSnapshot.data()
        }
      });
    });
    return events;
  })
}
export default class test extends React.Component {
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    firestore()
      .collection('calendarEvents')
      .add({eventName: value.EventName, dateAndTime: value.DateAndTime})
      .then(() => {
        console.log('Event Added!');
      });
  }
    constructor(props) {
        super(props);
    this.state = {
        items: {},
        show: false,
        showRsvp: '',
        eventName: '',
        dateAndTime: t.Date,
        clickedItem: ''
      };
    }
    render() {
        return (
          <View style={{ paddingTop: 50, flex: 1 }}>
          <Button title="test" onPress={getCalendarEvents}></Button>
          <FlatList
              data={events}/*from above*/
              keyExtractor={item => item._id}
              ItemSeperatorComponent={() => <Divider />}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.getCalendarEvents }
                >
                <List.Item
                  title={item.name/*from above*/}
                  description={"event description"}
                  //can add any other ui components necessary here
                />
                </TouchableOpacity>
              )}
            />
            <Button
              onPress={() => this.setState({show: true})}
              title="Add New Event">
            </Button>
            <Modal
              transparent={false}
              visible={this.state.show}
              animationType={"slide"}
            >
              <View>
                <View style={{backgroundColor: "000000aa", margin: 50, padding: 40, borderRadius: 10}}>
                <Form 
                  ref={c => this._form = c}
                  type={Event}
                />
                <Button title="Create New Event" onPress={this.handleSubmit}></Button>
                <Button title="Close Form" onPress={() => {this.setState({show:false})}}></Button>
                </View>
              </View>
            </Modal>
            <Agenda
              items={this.state.items}
              loadItemsForMonth={this.loadItems.bind(this)}
              selected={getCurrentDate}
              renderItem={this.renderItem.bind(this)}
             // renderEmptyDate={this.renderEmptyDate.bind(this)}
            />
          </View>
        );
      }
      loadItems(day) {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
            }

          }
        }, 500);
      }
      renderItem(item) {
        return (
          <TouchableOpacity 
            style={{marginLeft:10, marginRight: 10, marginTop: 17}} 
            onPress={() => {this.setState({showRsvp: true}),this.setState({clickedItem: item.name})}}
            // onPress={() => {this.setState({clickedItem: item.name})}}
            // onPress={() => Alert.alert(foo)}
            
          >
          <Modal
            transparent={false}
            visible={this.state.showRsvp}
            animationType={"slide"}
          >
            <View style={{backgroundColor:"000000aa", flex: 1}}>
              <View style={{backgroundColor: "ffffff", margin: 50, padding: 40, borderRadius: 10}}>
              <Text style={styles.itemDetails}>{user.displayName}</Text>
              <Button title="I can make it" onPress={this.handleSubmit}></Button>
              <Button title="I cannot make it" onPress={this.handleSubmit}></Button>
              <Button title="Close Form" onPress={() => {this.setState({showRsvp:false})}}></Button>
              </View>
            </View>
          </Modal>

          <Card style={{backgroundColor: "#ADD8E6"}}>
            <Card.Content>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>{item.name}</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        
        );
      }
      renderEmptyDate() {
        return (
          <TouchableOpacity style={{marginLeft: 10, marginRight: 10, marginTop: 17}}>
          <Card>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.emptyDateItem}>You have nothing scheduled for this date!</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        );
      }
      rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
      }
      timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split("T")[0];
      }
};
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