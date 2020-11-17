import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, Alert, ScrollView, Keyboard } from 'react-native';
import logo from '../assets/goldicon.png'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler'
const {width:WIDTH} = Dimensions.get('window')

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login', 
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Text style={styles.logoText}></Text>
                <SafeAreaView style={styles.logoContainer}>
                    <Image source={logo}/>
                    
                </SafeAreaView>
                
                <View> 
                    <TextInput
                        style={styles.input}
                        placeholder={'Username'}
                    />    
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={true}
                       
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style = {styles.createAccountButton}
                        activeOpacity = {.5}
                        onPress = {buttonPressed}
                        >
                            <Text sytle = {styles.buttonText}> Log In</Text>
                    </TouchableOpacity>
                    </View>
                <View alignItems='center'>
                        <Text style={styles.registerText}>Don't have an account?</Text>
                        <TouchableOpacity 
                        activeOpacity = {.5}
                        onPress={() => this.props.navigation.navigate("Registration")}>
                            <Text style = {styles.registerText}>Register Here</Text> 
                        </TouchableOpacity>    
                </View>
                
            </TouchableWithoutFeedback>
        );
    }
}
const buttonPressed = () => {
    Alert.alert(
        "Button has been pressed!",
        "You have pressed the button!"
        )
        
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
        alignItems: 'center',
        width:360,
        
        
        
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
    }
});