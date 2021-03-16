
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
import Messenger from './messenger_module/Messenger'
import Main from './screens/MainPage'
import NewMessage from './messenger_module/NewMessage'
import Chat from './messenger_module/Chat'
import { IconButton } from 'react-native-paper';
import EditProfile from './screens/EditProfile';
import AddEvent from './scheduler_module/AddEvent';
import ShowEvent from './scheduler_module/ShowEvent';
import EventCalendar from './scheduler_module/EventCalendar';


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

const ChatStack = createStackNavigator();
const NewMessageStack = createStackNavigator();
const NewSchedulerStack = createStackNavigator();

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
            <Stack.Screen name = "EditProfile" component = {EditProfile}/>
        </Stack.Navigator>
    );
}

const MessengerStack = () => {
    return(
        <NewMessageStack.Navigator mode='modal' headerMode='none'>
            <NewMessageStack.Screen name='Chat' component={chat} />
            <NewMessageStack.Screen name='NewMessage' component={NewMessage} />
        </NewMessageStack.Navigator>
    );
}

const SchedulerStack = () => {
    return(
        <NewSchedulerStack.Navigator name='modal' headerMode='none'>
                <NewSchedulerStack.Screen name='Agenda' component={EventCalendar} />
                <NewSchedulerStack.Screen name='AddEvent' component={AddEvent} />
                <NewSchedulerStack.Screen name='ShowEvent' component={ShowEvent} />
        </NewSchedulerStack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Login" component={IntroScreens} 
                    options={{swipeEnabled:false, drawerLabel:""}}/>
                <Drawer.Screen name="Main" component={LogInStack} />
                <Drawer.Screen name="My Profile" component={AboutMe} />
                <Drawer.Screen name="Scheduling" component={Scheduling} />
                <Drawer.Screen name="Auction" component={AuctionForm} />
                {/* <Drawer.Screen name="Submit Assignments" component={SubmitAssignment} /> */}
                <Drawer.Screen name="Messenger" component={MessengerStack} />
                <Drawer.Screen name="Scheduler" component={SchedulerStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

//stack navigator to handle the messenger components 
const chat = () => {
    return(
        <ChatStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#F5B0C2'},
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontSize: 22 }
            }}>
            <ChatStack.Screen 
                name='Messenger' 
                component={Messenger}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <IconButton
                            icon = 'message-plus'
                            size = {28}
                            color = '#ffffff'
                            onPress = {() => navigation.navigate('NewMessage')}/>
                    )
                })}
            />
            <ChatStack.Screen name='ChatRoom' component={Chat}
            options={({ route }) => ({
                title: route.params.thread.name
            })} />
        </ChatStack.Navigator>
            

    );
}



