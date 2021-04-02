import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert, FlatList, ActivityIndicatorComponent } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton, Title, List, Divider } from 'react-native-paper';
import { firestore } from 'firebase';
import firebase from '../database/firebase.js';
import Loading from '../assets/Loading';

const {width:WIDTH} = Dimensions.get('window')

export default function NewMessage({ navigation }) {
    const currentUser = firebase.auth().currentUser;
    const currentUserName = currentUser.displayName;

    const [room, setRoom] = useState('');
    const [loading, setLoading] = useState(true);

    //hook to access Users collection
    //similar structure to hook in Messenger class
    useEffect(() => {
        const unsubscribe = firestore()
        .collection('Users')
        .onSnapshot(querySnapshot => {
            const room = querySnapshot.docs.map(documentSnapshot => {
                return {
                    _id: documentSnapshot.id,
                    name: '',
                    ...documentSnapshot.data()
                };
            });

            setRoom(room);

            if(loading) {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if(loading) {
        return <Loading />;
    }

    //creates a new chat room with the current user and the other chat user chosen
    function handleButtonPress(userID, userNam){

        if(currentUser.uid < userID){
            const roomID = userNam + ", " + currentUserName;

            //creates a document within the chat collection setting the chat room name as document name
            firestore().collection('chat').doc(roomID)
        .set({
            name: roomID,
            members: [currentUser.uid, userID]
        })
        .then(() => {
            navigation.goBack();
        });

        } else {
            const roomID = userNam + ", " + currentUserName;

            firestore().collection('chat').doc(roomID)
        .set({
            name: roomID,
            members: [currentUser.uid, userID]
        })
        .then(() => {
            navigation.goBack();
        });
        }
    }

    return(
    
        <View style = {styles.rootContainer}>
        <View style={styles.closeButtonContainer}>
            <IconButton
                icon='close-circle'
                size={36}
                color='#664633'
                onPress={() => navigation.goBack()}
            />
        </View>

        <View style={styles.listContainer}>
        <FlatList
            data={room}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
                <TouchableOpacity
                    onPress={() => handleButtonPress(item._id, item.name)}
                >
                <List.Item
                    title={item.name}
                    description={item.email}
                    titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    descriptionStyle={styles.listDescription}
                    descriptionNumberOfLines={1}
                />
                </TouchableOpacity>
            )}
        />
        </View>
        </View>
    
    );

}




const styles = StyleSheet.create({
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
        marginLeft: 25,
        alignItems: 'center',
        width:360,
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    logoText:{
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    inputTitle:{
        color: "#8A8F9E",
        textTransform: "uppercase", 
    },
    input:{
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    
    registerText:{
        color: 'blue',
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

    listTitle: {
        fontSize: 22
    },

    //styles from chat app

    rootContainer: {
        flex: 1
      },
      
    closeButtonContainer: {
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 1
      },
      
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      
    title: {
        fontSize: 24,
        marginBottom: 10
      },
      
    buttonLabel: {
        fontSize: 22
      },

    newMesContainer: {
        flex: 1,
        marginTop: 20
    },

    listTitle: {
        fontSize: 22
    },

    container: {
        backgroundColor: '#f5f5f5',
        flex: 1
      },
    
      listDescription: {
        fontSize: 16
      },

    listContainer: {
        marginTop: 50
    }

});