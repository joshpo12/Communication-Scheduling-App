import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, Alert, ScrollView, Keyboard, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { IconButton, Title, List, Divider } from 'react-native-paper';
import logo from '../assets/goldicon.png'
import profilepic from '../assets/female.png'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler'
//import { ScreenStackHeaderRightView } from 'react-native-screens';
import { firestore } from 'firebase';
import firebase from '../database/firebase.js';
import { useIsFocused } from '@react-navigation/native';

const {width:WIDTH} = Dimensions.get('window')

export default function MainPage ({ navigation }) {

    //variables to store the use state, collection reference, and the current user
    //isFocused variable is used for constantly keeping our information current with the database
    const [annoucements, setAnnouncements] = useState([]);
    const [profileList, setProfileList] = useState([]);
    const docRef = firestore().collection('Users');
    const isFocused = useIsFocused();
    const currentUser = firebase.auth().currentUser;

    //hook(allows you to use state and other React features) in our case here it's
    //used to call the annoucements chat and store it in a variable 
    useEffect(() => {
        const unsubscribe = firestore()
        .collection('chat')
        .where('name', '==', 'Lincoln Gold Announcements' )
        .onSnapshot(querySnapshot => {
            const annoucements = querySnapshot.docs.map(documentSnapshot => {
                return {
                    _id: documentSnapshot.id,
                    name: '',
                    latestMessage: {
                        text: ''
                    },
                    ...documentSnapshot.data()
                };
            });

            setAnnouncements(annoucements);

        });

        return () => unsubscribe();
    }, [isFocused]);

    //hook(allows you to use state and other React features) in our case here it's
    //used to call the list of users to display on the homepage
    useEffect(() => {
        const unsubscribe = docRef.onSnapshot((snapshot) =>{
            const listData = snapshot.docs.map((doc) => ({
                _id: doc.id,
                name: '',
                ...doc.data(),
            }));
            setProfileList(listData);
        });
        return() => unsubscribe();
    }, [isFocused]);
    
    //function to handle the pressing of name displayed, takes user to that profile page
    function handleSelect(item) {
        navigation.navigate('GOLD Girls', {
            screen: 'ProfileList',  
            params: {id: item},
        });
    }

    //function to compare ids so that the current user is not displayed in the list of GOLD Girls to view
    function compareIDs(item) {
        return (item._id == currentUser.uid);
    }

    //return anything to be seen on screen using "<View>" and other react native components 
    return (
            <TouchableWithoutFeedback 
            onPress={Keyboard.dismiss} 
            accessible={false}
            >
                
                <Text style={styles.logoText}></Text>
                <View style={styles.logoContainer}>
                    <Image source={logo}/>
                    
                </View>

                <View style = {styles.horizontalLine}></View>

                <View style = {styles.frontendBox}>
                    <FlatList
                        data={annoucements}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={() => <Divider />}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Messenger', { thread:item })}
                            >
                            <List.Item
                                title={item.name}
                                description={item.latestMessage.text}
                                titleNumberOfLines={1}
                                titleStyle={styles.listTitle}
                                descriptionStyle={styles.listDescription}
                                descriptionNumberOfLines={1}
                            />
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <View>
                    <Text style = {styles.messageComment}> 
                        (Click to see recent notifications)</Text>
                </View>

                <View alignItems = 'center'>
                    <Text style = {styles.mainPageText}>
                        Find a Fellow GOLD Girl</Text>
                </View>

                <View>
                <FlatList
                contentContainerStyle={{ paddingBottom: 1550 }}
                scrollEnabled = 'true'
                data = {profileList}
                keyExtractor = {item => item._id}
                ItemSeparatorComponent = {() => <Divider />}
                renderItem = {({item}) => (
                    compareIDs(item) == false ? 
                    <TouchableOpacity onPress = {() => handleSelect(item._id)}>
                    <List.Item
                    title={item.name}
                    titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                />
                    </TouchableOpacity>
                    : null
                )}
            />
                </View>
                <View></View>
            </TouchableWithoutFeedback>
        );
}

//various styles for each element on display are created here
const styles = StyleSheet.create({
    something: {
        flexGrow: 1, 
        paddingBottom: 20
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer:{
        marginTop: 50,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    logoText:{
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    input:{
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#F5B0C2',
        borderColor: '#fff',
        marginHorizontal: 25,
        marginTop: 20,
        
    },
    registerText:{
        marginTop: 10,
        fontSize: 10
    },
    createAccountButton: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 145,
        marginRight: 145,
        backgroundColor: '#F5B0C2',
        borderRadius: 30,
        
        borderColor: '#fff',
    },
    buttonText: {
        textAlign: 'center'
    },
    horizontalLine: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginLeft: 50,
        marginRight: 50,
    },
    frontendBox: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 100,
        padding: 20,
        marginVertical: 50,
        marginHorizontal: 50,
    },
    mainPageText: {
        marginVertical: 10,
        fontSize: 25,
        color: 'gray',
    },
    searchbarContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
        marginVertical: 10,
    },
    searchInputContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
    },
    searchbar: {
        paddingRight: 200,
        backgroundColor: 'white',
    },
    scroll: {
        height: '25%',
        width: '75%',
        marginHorizontal: 50,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyPic: {
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 20,
    }, 

    listTitle: {
        fontSize: 18
    },

    messageComment: {
        fontSize: 11,
        marginTop: -45,
        marginLeft: 100,
        marginRight: 100
    }

});
