import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import finance from './assets/financeClass.jpg'
import stress from './assets/stress.jpg'
import female from './assets/female.png'

const {width:WIDTH} = Dimensions.get('window')

export default class SubmitAssignment extends Component{
    static navigationOptions = {
        title: 'SubmitAssignemnt',
    };
    render() {
        const {navigate } = this.props.navigation;
        return (
            <View>
                <View>
                    <Text style={styles.header}>
                    {'Event Photo Submissions'}
                    </Text> 
                </View>

                <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginBottom: 40,
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10
                    }}
                />

                <View style={styles.picContainer}>
                    <Image style={styles.picture} source={finance}/>
                </View>

                <View>
                    <Text style={styles.info}>
                    {'Finance Class'} 
                    {'\n'}
                    {'November 3rd'}
                    </Text>
                    <TouchableOpacity
                        style = {styles.submitButton}
                        activeOpacity = {.5}
                        onPress = {buttonPressed}
                        >
                            <Text> Submit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.picContainer}>
                    <Image style={styles.picture} source={stress}/>
                </View>

                <View>
                    <Text style={styles.info}>
                    {'Coping with Stress and Life'} 
                    {'\n'}
                    {'November 17th'}
                    </Text>
                    <TouchableOpacity
                        style = {styles.submitButton}
                        activeOpacity = {.5}
                        onPress = {buttonPressed}
                        >
                            <Text> Submit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.picContainer}>
                    <Image style={styles.picture} source={female}/>
                </View>

                <View>
                    <Text style={styles.info}>
                    {'Shari Turpin'} 
                    {'\n'}
                    {'December 1st'}
                    </Text>
                    <TouchableOpacity
                        style = {styles.submitButton}
                        activeOpacity = {.5}
                        onPress = {buttonPressed}
                        >
                            <Text> Submit</Text>
                    </TouchableOpacity>
                </View>

            </View>
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
    header:{
        marginTop: 15,
        marginBottom: 5,
        width: WIDTH - 40,
        height: 40,
        fontSize: 30,
        color: 'black',
        marginLeft: 25,
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
        fontSize: 12,
        color: 'black',
        alignItems: 'flex-end'
    },

    submitButton:{
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 40,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 170,
        marginRight: 30,
        backgroundColor: '#F5B0C2',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
        
    }
});