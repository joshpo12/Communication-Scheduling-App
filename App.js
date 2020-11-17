import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

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