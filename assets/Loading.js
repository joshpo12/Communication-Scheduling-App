//Loading class used to handle backend loading when calling collections

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading() {
    return(
        <View style={StyleSheet.loadingContainer}>
            <ActivityIndicator size='large' color='#6646ee'/>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
