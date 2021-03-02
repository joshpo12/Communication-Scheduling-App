import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton, Title, List, Divider } from 'react-native-paper';
import { firestore } from 'firebase';
import Loading from '../assets/Loading';

const {width:WIDTH} = Dimensions.get('window')

export default function NewMessage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        this.retrieveData();
        this.userData();
    },[]);

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
      }

});