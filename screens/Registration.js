import { firestore } from 'firebase';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../assets/goldicon.png';
import firebase from '../database/firebase.js';

const {width:WIDTH} = Dimensions.get('window')

export default class Registration extends Component {
    static navigationOptions = {
        title: 'Registration', 
    };

    constructor() {
        super();
        this.state = {
            userName: '',
            email: '',
            password: '',
            isLoading: false
        }
    }

    //takes in user input and updates the registration values
    updateInput = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    //function to register a new user as well as add that user to a collection
    register = () => {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup.')
        } else {
            this.setState({isLoading: true})
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                //adds a user to the Users collection 
                const currentUser = firebase.auth().currentUser
                firestore().collection('Users').doc(currentUser.uid).set({
                    name: this.state.userName,
                    email: this.state.email,
                    school: 'Please update your school',
                    schoolYear: 'Please update your school year',
                    bio: 'Please update your bio',
                    _id: currentUser.uid
                });
                //updates the members in Lincoln GOLD Announcements chat to add the new user
                firestore().collection('chat').doc('fMwWgGc2Ws72obbW9qeC').update({
                    members: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                });
                res.user.updateProfile({
                    displayName: this.state.userName
                })
                console.log('User registered successfully!')
                this.setState({
                    isLoading: false,
                    userName: '',
                    email: '',
                    password: ''
                })
                //this.props.navigation.navigate('Main')
            })
            .catch(error => this.setState({errorMessage: error.message }))
            
            this.props.navigation.navigate('Main')
        }
    }


    render() {
        const { navigation } = this.props.navigation;
        return (
            <View>
                <Text style={styles.logoText}></Text>
                <SafeAreaView style={styles.logoContainer}>
                    <Image source={logo}/>
                    
                </SafeAreaView>
                
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.input}
                        value = {this.state.userName}
                        onChangeText={(val) => this.updateInput(val, 'userName')}
                    />    
                </View>

                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value = {this.state.email}
                        onChangeText={(val) => this.updateInput(val, 'email')}
                    />    
                </View>

                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value = {this.state.password}
                        onChangeText={(val) => this.updateInput(val, 'password')}
                        secureTextEntry={true}
                    />    
                </View>

                <View>
                    <TouchableOpacity
                        style = {styles.createAccountButton}
                        activeOpacity = {.5}
                        onPress = {() => this.register()}
                        >
                            <Text style = {styles.buttonText}> Create Account</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
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
    }
});