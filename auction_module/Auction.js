import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, Alert, ScrollView } from 'react-native';
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
                     
                <View>
                    <Text style={styles.input_description}>Silent Auction Item Name</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={itemName}
                        onChangeText={name => setItemName(name)}
                    />    
                </View>
                
                <View>
                    <Text style={styles.input_description}>Description of Package</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={itemDescription}
                        onChangeText={description => setItemDescription(description)}
                    />  
                </View>
                
                <View>
                    <Text style={styles.input_description}>Value</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={itemValue}
                        onChangeText={value => setItemValue(value)}
                    />
                </View>
                
                <View>
                    <Text style={styles.input_description}>Donor Name</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={donorName}
                        onChangeText={donorName => setDonorName(donorName)}
                    />
                </View>
               
                <View>
                    <Text style={styles.input_description}>Donor Organization</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={donorOrganization}
                        onChangeText={donorOrganization => setDonorOrganization(donorOrganization)}
                    />
                </View>
                
                <View>
                    <Text style={styles.input_description}>Phone Number</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={number => setPhoneNumber(number)}
                    />
                </View>
                
                <View>
                    <Text style={styles.input_description}>Email Address</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={email}
                        onChangeText={email => setEmail(email)}
                    />
                </View>
                
                <View>
                    <Text style={styles.input_description}>Donor Address</Text>
                    <TextInput
                        autoCapitalize='none'
                        required
                        style={styles.input}
                        value={donorAddress}
                        onChangeText={address => setDonorAddress(address)}
                    />
                </View>
                    <Button style={styles.submitFormButton} onPress={handleButtonPress} title="Submit Form"></Button>
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
        textAlign: 'center'
    },
    input:{
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#F5B0C2',
        borderColor: '#777777',
        borderWidth: 1,
        color: 'black',
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