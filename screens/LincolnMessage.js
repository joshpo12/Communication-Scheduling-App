import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import female from '../assets/female.png'
import logo from '../assets/goldicon.png'

const {width:WIDTH} = Dimensions.get('window')

export default class LincolnMessage extends Component{
    static navigationOptions = {
        title: 'LincolnMessage',
    };

    goBack = () => {
        this.props.navigation.navigate("messager");
            };

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View>
                <SafeAreaView>
                    <Text style={styles.header}>
                    {'Lincoln GOLD Announcements'}
                    </Text> 
                </SafeAreaView>

                <TouchableOpacity
                        style = {styles.submitButton}
                        activeOpacity = {.5}
                        onPress = {this.goBack}
                        >
                            <Text>back to messages</Text>
                    </TouchableOpacity>

                <View style={styles.line}
                />

                <Text style={styles.message}>
                {'Reminder there is an event tomorrow at 4:30.'}
                </Text>

                <Text style={styles.yourMessage}>
                {'DM me if you are from Lincoln High and want to carpool.'}
                </Text>

                <Text style={styles.message}>
                {'Make sure to wear warm clothes. Its going to be chilly.'}
                </Text>

            </View>
        )
    }
}

const buttonPressed = () => {
    Alert.alert(
        "Button has been pressed!",
        "You have pressed the button!"
        )
        
}

const styles = StyleSheet.create({
    header:{
        marginTop: 15,
        marginBottom: 5,
        width: WIDTH - 40,
        height: 40,
        fontSize: 25,
        color: 'black',
        marginLeft: 20,
        marginRight: 20        
    },

    picContainer:{
        flex: 1,
        width: null,
        height: null,
    },

    picture:{
        height: 100,
        width: 100,
        marginLeft: 30,
    },

    info:{
        marginLeft: 180,
        marginRight: 30,
        fontSize: 12,
        color: 'black',
        alignItems: 'flex-end'
    },

    message:{
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 40,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 20,
        marginRight: 190,
        fontSize: 12,
        backgroundColor: '#F5B0C2',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
        
    },

    yourMessage:{
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 40,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 190,
        marginRight: 20,
        fontSize: 12,
        backgroundColor: '#F5B0C2',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
    },

    submitButton:{
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 100,
        marginRight: 100,
        backgroundColor: '#F5B0C2',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
    },

    line:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },

});