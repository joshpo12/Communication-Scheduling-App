import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, Alert, ScrollView, Keyboard } from 'react-native';
import { SearchBar } from 'react-native-elements';
import logo from '../assets/goldicon.png'
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler'
import { ScreenStackHeaderRightView } from 'react-native-screens';
const {width:WIDTH} = Dimensions.get('window')

export default class MainPage extends Component {
    static navigationOptions = {
        title: 'Main Page', 
    };
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };
    render() {
        const { navigate } = this.props.navigation;
        const { search } = this.state;
        
        return (
            <TouchableWithoutFeedback 
            onPress={Keyboard.dismiss} 
            accessible={false}>
                <Text style={styles.logoText}></Text>
                <SafeAreaView style={styles.logoContainer}>
                    <Image source={logo}/>
                    
                </SafeAreaView>

                <View style = {styles.horizontalLine}></View>

                <View style = {styles.frontendBox}>
                    <Text style = {styles.mainPageText}>test</Text>
                </View>

                <View alignItems = 'center'>
                <Text style = {styles.mainPageText}>
                    Find a Fellow GOLD Girl</Text>
                </View>

                <View alignItems = 'center'>
                    <SearchBar 
                    inputStyle = {styles.searchbar}
                    inputContainerStyle = {styles.searchInputContainer}
                    containerStyle = {styles.searchbarContainer}
                    placeholder = "Search" 
                    onChangeText = {this.updateSearch}
                    value = {search}
                    />
                </View>

                <ScrollView 
                style = {styles.scroll}
                contentContainerStyle = {styles.scrollContainer}>
                    <Text style = {styles.mainPageText}>
                        Quinn Reimer
                    </Text>
                    <Text style = {styles.mainPageText}>
                        Josh Pokorny
                    </Text>
                    <Text style = {styles.mainPageText}>
                        Jessica Wheeler
                    </Text>
                    <Text style = {styles.mainPageText}>
                        Inderpreet Kaur
                    </Text>
                    <Text style = {styles.mainPageText}>
                        Giorno Giovanna
                    </Text>
                    <Text style = {styles.mainPageText}>
                        Kevin Nguyen
                    </Text>
                </ScrollView>
            </TouchableWithoutFeedback>
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
        width:360
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
    horizontalLine: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginLeft: 50,
        marginRight: 50,
    },
    frontendBox: {
        borderColor: 'gray',
        borderWidth: 1,
        height: 100,
        padding: 20,
        marginVertical: 50,
        marginHorizontal: 50,
    },
    mainPageText: {
        marginVertical: 10,
        fontSize: 20,
        color: 'gray',
    },
    searchbarContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
        marginVertical: 10,
    },
    searchInputContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
    },
    searchbar: {
        paddingRight: 200,
        backgroundColor: 'white',
    },
    scroll: {
        height: '25%',
        width: '75%',
        marginHorizontal: 50,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
