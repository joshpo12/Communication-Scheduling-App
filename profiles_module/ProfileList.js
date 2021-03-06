import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Alert, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import profilepic from '../assets/profilepic.png';
import { firestore } from 'firebase';
import firebase from '../database/firebase.js'
import { Avatar } from 'react-native-gifted-chat';
import { IconButton, Title, List, Divider } from 'react-native-paper';


const {width:WIDTH} = Dimensions.get('window')

export default function ProfileList({navigation}) {
    const [profileList, setProfileList] = useState([]);
    const docRef = firestore().collection('Users');

    //hook(allows you to use state and other React features) in our case here it's
    //used to call a list of all users
    useEffect(() => {
        const unsubscribe = docRef.onSnapshot((snapshot)=>{
            const listData = snapshot.docs.map((doc)=>({
                _id: doc.id,
                name: '',
                ...doc.data(),
            }));
            setProfileList(listData);


        });
        return () => unsubscribe();
    }, []);

    //function to handle the pressing of a user, navigate to that profile page
    function handleSelect(item) {
        navigation.navigate('Profile',{
            id: item,
        });
    }

    function getInitials(username) {
        let initials = "";
        const split = username.split(' ', 3);
        for(var i = 0; i < split.length; ++i) {
            initials += split[i].charAt(0);
        }
        return initials
    }
 
    //return anything to be seen on screen using "<View>" and other react native components 
    return (
        //displays a list of all registered users 
        <View style = {styles.container}>
            <Text style={styles.headerTitle}>Find a GOLD Girl</Text>
            <View style={styles.straightLine}/>
            <FlatList
                contentContainerStyle={{paddingBottom:200}}
                scrollEnabled = 'true'
                data = {profileList}
                keyExtractor = {item => item._id}
                ItemSeparatorComponent = {() => <Divider />}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress = {() => handleSelect(item._id)}>
                        <View style = {styles.list}>
                        <Avatar 
                        size = "xlarge"
                        rounded
                        title = {getInitials(item.name)}
                        overlayContainerStyle = {{backgroundColor: '#F5B0C2'}}
                        />  

                        <Text style = {styles.name}>
                            {item.name}
                        </Text>
                    </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};

//various styles for each element on display are created here
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center',
        marginTop: 50
    },
    logoContainer: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    bio: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    straightLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    userOnly: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15
    },
    yourDues: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    dueAmt: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20
   },
    events: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 20,
        textDecorationLine: 'underline'
    },
    editProfileBtn: {
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 145,
        marginRight: 145,
        backgroundColor: '#E1B426',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonText: {
        textAlign: 'center'
    },
    list: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        
    },
    tinyPic: {
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 20,
    }
});
