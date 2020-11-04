import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';

const Navigator = createStackNavigator({
    Login: { screen: Login}
});

const App = createAppContainer(Navigator);

export default App;