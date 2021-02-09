
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login';
import AnimatedLoader from './screens/AnimatedLoader'
import AboutMe from './screens/AboutMe'
import AuctionForm from './screens/Auction_Form'
import SubmitAssignment from './screens/SubmitAssignment'
import Registration from './screens/Registration'
import Scheduling from './screens/Scheduling'
import Messager from './screens/messager'
import Main from './screens/MainPage'

// const DrawerNavigator = createDrawerNavigator({
//     AnimatedLoader: { screen: AnimatedLoader },
//     Login: { screen: Login},
//     Registration: { screen: Registration},
//     AboutMe: {screen: AboutMe},
//     AuctionForm: {screen: AuctionForm},
//     SubmitAssignment: {screen: SubmitAssignment},
//     Scheduling: { screen: Scheduling},
//     Messager: { screen: Messager},
//     Main: { screen: Main}
// });


const Stack = createStackNavigator();

const IntroScreens = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="AnimatedLoader" component={AnimatedLoader}
                options={{headerShown:null}}/>
            <Stack.Screen name="Login" component={Login}
                options={{gestureEnabled:false, headerLeft: null}}/>
            <Stack.Screen name="Registration" component={Registration}/>
        </Stack.Navigator>
    );
}

const LogInStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="AboutMe" component={AboutMe}
                options={{gestureEnabled:false, headerLeft: null}}/>
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Login" component={IntroScreens} 
                    options={{swipeEnabled:false, drawerLabel:""}}/>
                <Drawer.Screen name="Main" component={LogInStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}



