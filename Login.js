import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions } from 'react-native';
import logo from './assets/goldicon.png'

const {width:WIDTH} = Dimensions.get('window')

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login', 
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text style={styles.logoText}></Text>
                <SafeAreaView style={styles.logoContainer}>
                    <Image source={logo}/>
                    
                </SafeAreaView>
                
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={'Username'}
                        placeholderTextColor='white'
                    />    
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder={'Password'}
                        placeholderTextColor='white'
                        secureTextEntry={true}
                       
                    />
                </View>
                <View alignItems='center'>
                    <Text style={styles.registerText}>Register Here</Text>
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
        marginTop: 25,
        marginBottom: 25,
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
        backgroundColor: 'gray',
        color: 'white',
        marginHorizontal: 25,
        marginTop: 10.5,
        marginBottom: 10.5
    },
    registerText:{
        marginTop: 10,
        fontSize: 10
    }
});