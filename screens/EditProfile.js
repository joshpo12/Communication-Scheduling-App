import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, Alert, ScrollView, Keyboard } from 'react-native';
import logo from '../assets/goldicon.png';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import firebase from '../database/firebase.js';
import DropDownPicker from 'react-native-dropdown-picker';

const {width:WIDTH} = Dimensions.get('window')

export default class EditProfile extends Component {
    constructor() {
        super();

        this.state = {
        name: 'default name',
        school: 'default school',
        schoolYear: 'default year',
        bio: 'yare yare daze'
    };
    }

    updateText = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <Text style = {styles.headerTitle}>Edit profile</Text>
                </View>
                        
                <View style={styles.form}> 
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={(val) => this.updateText(val, 'name')}
                    />    
                </View>

                <View style={styles.form}>
                <Text style={styles.inputTitle}>School</Text>
                    <TextInput
                        autoCapitalize="none"
                        style={styles.input}
                        value={this.state.school}
                        onChangeText={(val) => this.updateText(val, 'school')}
                    />
                </View>
                <View>
                    <DropDownPicker
                        items = {[
                            {label: 'Freshman', value: 'freshman'},
                            {label: 'Sophomore', value: 'sophomore'},
                            {label: 'Junior', value: 'junior'},
                            {label: 'Senior', value: 'senior'},
                            {label: 'Other', value: 'other'},
                        ]}
                        placeholder = "Please select your grade level"
                        containerStyle={styles.dropContainer}
                        style = {styles.dropDown}
                        />
                </View>
                <View>
                    <TouchableOpacity
                        style = {styles.editProfileBtn}
                        activeOpacity = {.5}
                        onPress = {buttonPressed}
                        >
                            <Text style = {styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    </View>
                
            </TouchableWithoutFeedback>
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
    container: {
        marginTop: 20,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center',
        marginTop: 50
    },
    logoContainer: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        textAlign: 'center'
    },
    bio: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    straightLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    userOnly: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15
    },
    yourDues: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    dueAmt: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20
   },
    events: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20,
        textDecorationLine: 'underline'
    },
    editProfileBtn: {
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 145,
        marginRight: 145,
        backgroundColor: '#E1B426',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonText: {
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
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
    dropDown:{
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 2,
    },
    dropContainer:{
        height: 40,
        width: 360,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignContent: 'center',
        
    }

});