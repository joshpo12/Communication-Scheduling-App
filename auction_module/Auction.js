import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, Alert, ScrollView } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { firestore } from 'firebase';

const {width:WIDTH} = Dimensions.get('window')

export default function Auction({navigation}) {

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemValue, setItemValue] = useState('');
    const [donorName, setDonorName] = useState('');
    const [donorOrganization, setDonorOrganization] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [donorAddress, setDonorAddress] = useState('');

    var fields = 'false';
    
    function handleButtonPress() {
        checkTextInput();
        if (fields == 'false') {
            return;
        } else {
            firestore()
            .collection('auctionItems')
            .add({
                itemName: itemName,
                itemDescription: itemDescription,
                itemValue: itemValue,
                donorName: donorName,
                donorOrganization: donorOrganization,
                phoneNumber: phoneNumber,
                email: email,
                donorAddress: donorAddress
            })
            .then(Alert.alert('Silent Auction Item Submitted!'));
        }
    }

    function checkTextInput() {
        if (!itemName.trim() || !itemDescription.trim() || !itemValue.trim()
            || !donorName.trim() || !donorOrganization.trim() || !phoneNumber.trim()
            || !email.trim() || !donorAddress.trim()) {
            Alert.alert('Please make sure to fill out all of the required fields');
            return;
        }
        fields = 'true';
    }

        return (
            <ScrollView>
            <View style={styles.top_padding}>
            <Text style={styles.headerText}>Submit a Silent Auction Item</Text>
                     
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Silent Auction Item Name</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={itemName}
                        onChangeText={name => setItemName(name)}
                    />    
                </View>
                
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Description of Package</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={itemDescription}
                        onChangeText={description => setItemDescription(description)}
                    />  
                </View>
                
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Value</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={itemValue}
                        onChangeText={value => setItemValue(value)}
                    />
                </View>
                
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Donor Name</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={donorName}
                        onChangeText={donorName => setDonorName(donorName)}
                    />
                </View>
               
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Donor Organization</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={donorOrganization}
                        onChangeText={donorOrganization => setDonorOrganization(donorOrganization)}
                    />
                </View>
                
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Phone Number</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={number => setPhoneNumber(number)}
                    />
                </View>
                
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Email Address</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />
                </View>
                
                <View style={styles.form}>
                    <Text style={styles.inputTitle}>Donor Address</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={donorAddress}
                        onChangeText={address => setDonorAddress(address)}
                    />
                </View >
                    <TouchableOpacity
                        style = {styles.submitFormButton}
                        activeOpacity = {.5}
                        onPress = {handleButtonPress}
                        >
                            <Text style = {styles.buttonText}> Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

const styles = StyleSheet.create({
    top_padding:{
        paddingTop: 50
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 35
    },
    input:{
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    input_description:{
        paddingLeft: 45,
        marginTop: 10.5,
    },
    submitFormButton: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 70,
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
    inputTitle:{
        color: "#8A8F9E",
        textTransform: "uppercase"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    }
});