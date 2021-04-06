import React, { useEffect, useState, } from 'react';
import { Avatar } from "react-native-elements";
import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, Alert, FlatList, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import profilepic from '../assets/profilepic.png';
import { firestore } from 'firebase';
import firebase from '../database/firebase.js'
import { useIsFocused } from '@react-navigation/native';

const {width:WIDTH} = Dimensions.get('window')

export default function AboutMe({navigation}) {
    const currentUser = firebase.auth().currentUser;
    const [profile, setProfile] = useState([]);
    const docRef = firestore().collection('Users').where('_id', "==", currentUser.uid);
    const isFocused = useIsFocused();

    useEffect(() => {
        const unsubscribe = docRef.onSnapshot((snapshot)=>{
            const profileData = snapshot.docs.map((doc)=>({
                _id: doc.id,
                name: '',
                school: '',
                schoolYear: '',
                bio: '',
                email: '',
                userEvents: '',
                ...doc.data(),
            }));
            setProfile(profileData);
            
        });
        return () => unsubscribe();
    }, [isFocused]);

    function getInitials(username) {
        let initials = "";
        const split = username.split(' ', 3);
        for(var i = 0; i < split.length; ++i) {
            initials += split[i].charAt(0);
        }
        return initials
    };
    function buttonPressed() {
        Alert.alert(
            "Button has been pressed!",
            "You have pressed the button!"
        )
    }

    return(
        <FlatList
            data = {profile}
            ListHeaderComponent = {
                <View>
                    <Text style={styles.headerTitle}>Your Profile</Text>
                    <View style={styles.straightLine}/>
                </View>
            }
            keyExtractor = {item => item._id}
            renderItem = {({item}) => (
                <View>
                    <SafeAreaView style={styles.logoContainer}>
                        <Avatar 
                        size = "xlarge"
                        rounded
                        title = {getInitials(item.name)}
                        overlayContainerStyle = {{backgroundColor: '#F5B0C2'}}
                        />   
                    </SafeAreaView>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.name}>{item.school}</Text>
                    <Text style={styles.name}>{item.schoolYear}</Text>
                    <Text style={styles.name}>{item.email}</Text>
                    <Text style={styles.bio}>{item.bio}</Text>
                </View>
                )}
        ListFooterComponent = {
            <View>
                <TouchableOpacity style={styles.editProfileBtn} activeOpacity = {.5} 
                onPress={()=> navigation.navigate('EditProfile')}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
               {/* <View style={styles.straightLine}/>
                    <Text style={styles.userOnly}>Only You Can See</Text>
                    <Text style={styles.yourDues}>Your Dues:</Text>
                    <Text style={styles.dueAmt}>Remaining Due: $250</Text>
                    <Text style={styles.yourDues}>Your Events:</Text>
                    <Text style={styles.events}>November 3rd: Finance Class</Text>
                    <Text style={styles.dueAmt}>4:30pm via Zoom - [zoom link here]</Text>
                    <Text style={styles.events}>November 17th: Coping with Stress and Life</Text>
        <Text style={styles.dueAmt}>6:30pm via Zoom - [zoom link here]</Text> */}
             </View>
         }/>

                
                
    )};

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
        textAlign: 'center'
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
    profilePicture: {
        margin: 20,
        width: 150,
        height: 150,
    },
});