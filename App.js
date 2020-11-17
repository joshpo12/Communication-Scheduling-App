import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './screens/Login';
import messager from './screens/messager';
import LincolnMessage from './screens/LincolnMessage';

const Navigator = createDrawerNavigator({
    Login: { screen: Login },
    
    
});

const App = createAppContainer(Navigator);

export default App;