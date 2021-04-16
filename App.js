
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import AnimatedLoader from './screens/AnimatedLoader'
import AboutMe from './profiles_module/AboutMe'
import ProfileList from './profiles_module/ProfileList'
import Profile from './profiles_module/Profile'
import Registration from './screens/Registration'
import Messenger from './messenger_module/Messenger'
import Main from './screens/MainPage'
import NewMessage from './messenger_module/NewMessage'
import Chat from './messenger_module/Chat'
import { IconButton } from 'react-native-paper';
import AddEvent from './scheduler_module/AddEvent';
import ShowEvent from './scheduler_module/ShowEvent';
import EventCalendar from './scheduler_module/EventCalendar';
import Icon from 'react-native-vector-icons/Ionicons';
import EditProfile from './profiles_module/EditProfile';
import Auction from './auction_module/Auction';

//variables are created as Stack Navigators
const Stack = createStackNavigator();
const LogInStack = createStackNavigator();
const MainStack = createStackNavigator();
const AboutMeStack = createStackNavigator();
const ProfilesStack = createStackNavigator();
const AuctionStack = createStackNavigator();
const SchedulerStack = createStackNavigator();
const ChatStack = createStackNavigator();
const NewMessageStack = createStackNavigator();
const NewSchedulerStack = createStackNavigator();

//create functions for navigating between sets of pages using the variables 
//navigates the stack for the login and registration 
const LogInScreen = () => {
    return(
        <LogInStack.Navigator>
            <LogInStack.Screen name="AnimatedLoader" component={AnimatedLoader}
                options={{headerShown:null}}/>
            <LogInStack.Screen name="Login" component={Login}
                options={{gestureEnabled:false, headerLeft: null}}/>
            <LogInStack.Screen name="Registration" component={Registration}/>
        </LogInStack.Navigator>
    );
}

//navigates the stack for the main page
const MainStackScreen = ({navigation}) => {
    return(
        <MainStack.Navigator 
        screenOptions={{
            headerStyle: { backgroundColor: '#F5B0C2'},
            headerTintColor: '#ffffff',
            headerTitleStyle: { fontSize: 22 }
        }}>
            <MainStack.Screen name="Main Page" component={Main} options={{
                headerLeft: () => (
                    <Icon.Button name = "ios-menu" size = {25}
                    backgroundColor="#F5B0C2" onPress={() => navigation.openDrawer()}>
                    </Icon.Button>
                )}}/>
        </MainStack.Navigator>
    )
}

//navigates the stack for the About me pages
const AboutMeStackScreen = ({navigation}) => {
    return(
        <AboutMeStack.Navigator 
            screenOptions={{
                headerStyle: { backgroundColor: '#F5B0C2'},
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontSize: 22 }
            }}>
            <AboutMeStack.Screen name="About Me Page" component={AboutMe} options={{
                headerLeft: () => (
                    <Icon.Button name = "ios-menu" size = {25}
                    backgroundColor="#F5B0C2" onPress={() => navigation.openDrawer()}>
                    </Icon.Button>
                )}}/>
            <AboutMeStack.Screen name = "EditProfile" component = {EditProfile}/>
        </AboutMeStack.Navigator>
    )
}

//navigates the stack for the silent auction item
const AuctionStackScreen = ({navigation}) => {
    return(
        <AuctionStack.Navigator 
            screenOptions={{
                headerStyle: { backgroundColor: '#F5B0C2'},
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontSize: 22 }
            }}>
            <AuctionStack.Screen name="Submit a Silent Auction Item" component={Auction} options={{
                headerLeft: () => (
                    <Icon.Button name = "ios-menu" size = {25}
                    backgroundColor="#F5B0C2" onPress={() => navigation.openDrawer()}>
                    </Icon.Button>
                )}}/>
        </AuctionStack.Navigator>
    )
}

//navigates the stack for the messenger pages
const MessengerStack = () => {
    return(
        <NewMessageStack.Navigator mode='modal' headerMode='none'>
            <NewMessageStack.Screen name='Chat' component={chat} />
            <NewMessageStack.Screen name='NewMessage' component={NewMessage} />
        </NewMessageStack.Navigator>
    );
}

//navigates the stack for the GOLD Girls
const ProfilesStackScreen = ({navigation}) => {
    return(
        <ProfilesStack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#F5B0C2'},
            headerTintColor: '#ffffff',
            headerTitleStyle: { fontSize: 22 }
        }}>
            <ProfilesStack.Screen name = "ProfileList" component={ProfileList} options={{
                headerLeft: () => (
                    <Icon.Button name = "ios-menu" size = {25}
                    backgroundColor="#F5B0C2" onPress={() => navigation.openDrawer()}>
                    </Icon.Button>
                )}}/>
            <ProfilesStack.Screen name = "Profile" component = {Profile}/>
            
        </ProfilesStack.Navigator>
    )
}

//navigates the stack for the scheduler 
const SchedulerStackScreen = () => {
    return(
        <NewSchedulerStack.Navigator name='modal' headerMode='none'>
                <NewSchedulerStack.Screen name='Scheduler Header' component={SchedulerHeader}/>
                <NewSchedulerStack.Screen name='Agenda' component={EventCalendar} />
                <NewSchedulerStack.Screen name='AddEvent' component={AddEvent} />
                <NewSchedulerStack.Screen name='ShowEvent' component={ShowEvent} />
        </NewSchedulerStack.Navigator>
    )
}

//variable for a drawer navigator
const Drawer = createDrawerNavigator();

//create a single drawer navigator (side menu in our case) for access to every screen 
export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login">
                <Drawer.Screen name="Main" component={MainStackScreen} />
                <Drawer.Screen name="My Profile" component={AboutMeStackScreen} />
                <Drawer.Screen name="Submit Silent Auction Item" component={AuctionStackScreen} />
                <Drawer.Screen name="Messenger" component={MessengerStack} />
                <Drawer.Screen name="GOLD Girls" component={ProfilesStackScreen}/>
                <Drawer.Screen name="Scheduler" component={SchedulerStackScreen} />
                <Drawer.Screen name="Login" component={LogInScreen} 
                    options={{swipeEnabled:false, drawerLabel:"Logout"}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

//stack function to handle the interaction of the messenger components 
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
                    ),
                    headerLeft: () => (
                        <Icon.Button name = "ios-menu" size = {25}
                        backgroundColor="#F5B0C2" onPress={() => navigation.openDrawer()}>
                        </Icon.Button>
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

//stack function to handle the interaction of the scheduler pages 
const SchedulerHeader = () => {
    return(
        <SchedulerStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#F5B0C2'},
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontSize: 22 }
            }}>
                <SchedulerStack.Screen 
                name='Event Calendar' 
                component={EventCalendar}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon.Button name = "ios-menu" size = {25}
                        backgroundColor="#F5B0C2" onPress={() => navigation.openDrawer()}>
                        </Icon.Button>
                    )
                })}
            />
        </SchedulerStack.Navigator>
    )
}



