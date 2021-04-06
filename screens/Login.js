import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, Alert, ScrollView, Keyboard } from 'react-native';
import logo from '../assets/goldicon.png';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import firebase from '../database/firebase.js';
const {width:WIDTH} = Dimensions.get('window')

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login', 
    };

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    updateInput = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    login = () => {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to login.')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                console.log(res)
                console.log('User login successful.')
                this.setState({
                    isLoading: false,
                    email: '',
                    password: ''
                })
                this.props.navigation.navigate('Main')
            })
            .catch(error => this.setState({ errorMessage: error.message}))
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Text style={styles.logoText}></Text>
                <SafeAreaView style={styles.logoContainer}>
                    <Image source={logo}/>
                    
                </SafeAreaView>
                
                <View style={styles.form}> 
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={(val) => this.updateInput(val, 'email')}
                    />    
                </View>

                <View style={styles.form}>
                <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={(val) => this.updateInput(val, 'password')}
                        secureTextEntry={true}
                       
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style = {styles.createAccountButton}
                        activeOpacity = {.5}
                        onPress = {() => this.login()}
                        >
                            <Text style = {styles.buttonText}> Log In</Text>
                    </TouchableOpacity>
                    </View>
                <View alignItems='center'>
                        <Text style={styles.registerText}>Don't have an account?</Text>
                        <TouchableOpacity 
                        activeOpacity = {.5}
                        onPress={() => this.props.navigation.navigate("Registration")}>
                            <Text style = {styles.register}>Register Here</Text> 
                        </TouchableOpacity>    
                </View>
                
            </TouchableWithoutFeedback>
        );
    }
}
/*const buttonPressed = () => {
    Alert.alert(
        "Button has been pressed!",
        "You have pressed the button!"
        )
        
}*/
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
        justifyContent: 'center',
        alignItems: 'center',
        
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
        marginTop: 10,
        marginBottom: 5,
        fontSize: 10,
        color: "#8A8F9E",
        textTransform: "uppercase" 
    },
    register:{
        color: "#E9446A",
        fontSize: 13
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
        textAlign: 'center',
    },
    errorMessage: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#FF0000",
        textAlign: "center"
    }
});