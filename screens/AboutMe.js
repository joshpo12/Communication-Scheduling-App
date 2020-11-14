import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Button, Alert, AppRegistry } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import profilepic from '../assets/profilepic.png';
import { StackNavigator } from 'react-navigation'
import App from './App';

const {width:WIDTH} = Dimensions.get('window')

export default class AboutMe extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Your Profile</Text>
                <View style={styles.straightLine}/>
                <SafeAreaView style={styles.logoContainer}>
                    <Image source={profilepic}/>   
                </SafeAreaView>
                <View>
                    <Text style={styles.name}>Kevin Nguyen</Text>
                    <Text style={styles.name}>Junior, Lincoln Northeast</Text>
                    <Text style={styles.bio}>I am the Development Manager of the Lincoln GOLD Senior Design Project. I enjoy working on this project.</Text>
                    <View>
                        <TouchableOpacity style={styles.editProfileBtn} activeOpacity = {.5} onPress={buttonPressed}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.straightLine}/>
                    <Text style={styles.userOnly}>Only You Can See</Text>
                    <Text style={styles.yourDues}>Your Dues:</Text>
                    <Text style={styles.dueAmt}>Remaining Due: $250</Text>
                    <Text style={styles.yourDues}>Your Events:</Text>
                    <Text style={styles.events}>November 3rd: Finance Class</Text>
                    <Text style={styles.dueAmt}>4:30pm via Zoom - [zoom link here]</Text>
                    <Text style={styles.events}>November 17th: Coping with Stress and Life</Text>
                    <Text style={styles.dueAmt}>6:30pm via Zoom - [zoom link here]</Text>
                </View>
            </View>
        )};
};

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
    }
});