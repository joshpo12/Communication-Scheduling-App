import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import female from '../assets/female.png'
import logo from '../assets/goldicon.png'

const {width:WIDTH} = Dimensions.get('window')

export default class Messager extends Component{
    static navigationOptions = {
        title: 'Messager',
    };

    goToMessage = () => {
        this.props.navigation.navigate("LincolnMessage");
            };

    render() {
        const { navigate } = this.props.navigation;
        return(
            <View>
            <SafeAreaView>
                    <Text style={styles.header}>
                    {'Messages'}
                    </Text>

                        <TouchableOpacity
                            style = {styles.submitButton}
                            activeOpacity = {.5}
                            onPress = {buttonPressed}
                            >
                            <Text>New Message</Text>
                        </TouchableOpacity>
                </SafeAreaView>
        
                <View style={styles.line}
                />

            <ScrollView>
            <SafeAreaView>
            <View style={styles.picContainer}>
                <Image style={styles.picture} source={logo}/>
            </View>

            <View>
                <Text style={styles.info}>
                {'Lincoln GOLD Announcments'}
                </Text>
                <TouchableOpacity
                    style = {styles.messageButton}
                    activeOpacity = {.5}
                    onPress = {() => this.props.navigation.navigate("LincolnMessage")}
                    >
                        <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line}
                />
                </SafeAreaView>

            <View style={styles.picContainer}>
                <Image style={styles.picture} source={female}/>
            </View>

            <View>
                <Text style={styles.info}>
                {'Inderpreet Kaur'} 
                </Text>
                <TouchableOpacity
                    style = {styles.messageButton}
                    activeOpacity = {.5}
                    onPress = {buttonPressed}
                    >
                        <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line}
                />

            <View style={styles.picContainer}>
                <Image style={styles.picture} source={female}/>
            </View>

            <View>
                <Text style={styles.info}>
                {'Quinn Reimer'} 
                </Text>
                <TouchableOpacity
                    style = {styles.messageButton}
                    activeOpacity = {.5}
                    onPress = {buttonPressed}
                    >
                        <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line}
                />

                <View style={styles.picContainer}>
                <Image style={styles.picture} source={female}/>
            </View>

            <View>
                <Text style={styles.info}>
                {'Kevin Nyugen'} 
                </Text>
                <TouchableOpacity
                    style = {styles.messageButton}
                    activeOpacity = {.5}
                    onPress = {buttonPressed}
                    >
                    <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line}
                />

                <View style={styles.picContainer}>
                <Image style={styles.picture} source={female}/>
            </View>

            <View>
                <Text style={styles.info}>
                {'Jessica Wheeler'} 
                </Text>
                <TouchableOpacity
                    style = {styles.messageButton}
                    activeOpacity = {.5}
                    onPress = {buttonPressed}
                    >
                        <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line}
                />

                <View style={styles.picContainer}>
                <Image style={styles.picture} source={female}/>
            </View>

            <View>
                <Text style={styles.info}>
                {'Lace Leatherman'} 
                </Text>
                <TouchableOpacity
                    style = {styles.messageButton}
                    activeOpacity = {.5}
                    onPress = {buttonPressed}
                    >
                        <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line}
                />

                <View style={styles.picContainer}>
                <Image style={styles.picture} source={female}/>
            </View>

            <View>
                <Text style={styles.info}>
                {'Josh Pokorny'} 
                </Text>
                <TouchableOpacity
                    style = {styles.messageButton}
                    activeOpacity = {.5}
                    onPress = {buttonPressed}
                    >
                        <Text>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.line}
                />

                </ScrollView>
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