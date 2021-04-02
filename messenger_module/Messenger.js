import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton, Title, List, Divider } from 'react-native-paper';
import { firestore } from 'firebase';
import Loading from '../assets/Loading';
import firebase from '../database/firebase.js';

const {width:WIDTH} = Dimensions.get('window')

export default function Messenger({navigation}) {
    //variables to hold current state value 
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = firebase.auth().currentUser;

    //hook(allows you to use state and other React features) in our case here it's
    //used to call the chat collection from firebase 
    useEffect(() => {
        const unsubscribe = firestore()
        .collection('chat')
        //.orderBy('latestMessage.createdAt', 'desc')
        .where('members', 'array-contains', currentUser.uid )
        .onSnapshot(querySnapshot => {
            const chats = querySnapshot.docs.map(documentSnapshot => {
                return {
                    _id: documentSnapshot.id,
                    name: '',
                    latestMessage: {
                        text: ''
                    },
                    ...documentSnapshot.data()
                };
            });

            setChats(chats);

            if(loading) {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if(loading) {
        return <Loading />;
    }

    return(
    
        <View style = {styles.container}>
        <FlatList
            data={chats}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('ChatRoom', { thread:item })}
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
    
    );

}

const styles = StyleSheet.create({
    /*container: {
        backgroundColor: '#f5f5f5',
        flex: 1
    },*/

    header:{
        marginTop: 15,
        marginBottom: 5,
        width: WIDTH - 40,
        height: 40,
        fontSize: 30,
        color: 'black',
        marginLeft: 120,
        marginRight: 25        
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
        marginTop: -70,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'flex-end'
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

    messageButton:{
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 300,
        marginRight: 20,
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
    }
});