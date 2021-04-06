import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, TextInput, Dimensions, BackHandler, Button, Alert, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width:WIDTH} = Dimensions.get('window')

export default class Auction extends Component {
    static navigationOptions = {
        title: 'Auction', 
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView>
                <ScrollView>
                <View>
                    <Text style={styles.input_description}>Silent Auction Item Name</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />    
                </View>
                <View>
                    <Text style={styles.input_description}>Description of Package</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.input_description}>Value</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.input_description}>Donor Name</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.input_description}>Donor Organization</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.input_description}>Phone Number</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.input_description}>Email Address</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.input_description}>Donor Address</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                    />
                </View>
                <View style={styles.button_style}>
                    <TouchableOpacity style = {styles.submitFormButton} activeOpacity = {.5}>
                        <Text sytle = {styles.buttonText}>Submit Form</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    input:{
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#F0EDED',
        borderColor: '#777777',
        borderWidth: 1,
        color: 'white',
        marginHorizontal: 25,
        marginTop: 10.5,
        marginBottom: 10.5
    },
    input_description:{
        paddingLeft: 45,
        marginTop: 10.5,
    },
    submitFormButton: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 130,
        marginRight: 130,
        backgroundColor: '#F5B0C2',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        textAlign: 'center'
    }
});