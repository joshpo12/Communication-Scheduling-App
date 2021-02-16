import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Button, Alert, AppRegistry } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width:WIDTH} = Dimensions.get('window')

export default class EditProfile extends Component {
    render() {
        return (
            <View>
            <Text>Edit profile page</Text>
        </View>
        )
    }
}