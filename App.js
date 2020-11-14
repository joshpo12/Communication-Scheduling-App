import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

//import AboutMe from './screens/AboutMe';
import Auction from './screens/Auction_Form';
import Login from './screens/Login';
import MainPage from './screens/MainPage';
import Registration from './screens/Registration';
import SubmitAssignment from './screens/SubmitAssignment';


const Navigator = createDrawerNavigator({
    MainPage: { screen: MainPage },
});

const App = createAppContainer(Navigator);

export default App;