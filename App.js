// @refresh reset
import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import * as firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQDmc-GSlwzY0QVZB0ex3_pnbfpwhO_Hk",
    authDomain: "lincoln-gold-mobile-app.firebaseapp.com",
    databaseURL: "https://lincoln-gold-mobile-app-default-rtdb.firebaseio.com",
    projectId: "lincoln-gold-mobile-app",
    storageBucket: "lincoln-gold-mobile-app.appspot.com",
    messagingSenderId: "1079193841389",
    appId: "1:1079193841389:web:fca8de25fc188f17fde6e4"
  };
  // Initialize Firebase
  if(firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

import Login from './screens/Login';
import AnimatedLoader from './screens/AnimatedLoader'
import AboutMe from './screens/AboutMe'
import AuctionForm from './screens/Auction_Form'
import SubmitAssignment from './screens/SubmitAssignment'
import Registration from './screens/Registration'
import Scheduling from './screens/Scheduling'
import Messager from './screens/messager'
import Main from './screens/MainPage'

const DrawerNavigator = createDrawerNavigator({
    AnimatedLoader: { screen: AnimatedLoader },
    Login: { screen: Login},
    Registration: { screen: Registration},
    AboutMe: {screen: AboutMe},
    AuctionForm: {screen: AuctionForm},
    SubmitAssignment: {screen: SubmitAssignment},
    Scheduling: { screen: Scheduling},
    Messager: { screen: Messager},
    Main: { screen: Main}
});

const App = createAppContainer(DrawerNavigator);

export default App;