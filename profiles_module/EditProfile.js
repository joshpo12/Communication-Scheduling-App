import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Alert, Keyboard, FlatList } from 'react-native';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import firebase from '../database/firebase.js';
import { firestore } from 'firebase';

const {width:WIDTH} = Dimensions.get('window')

export default function EditProfile({navigation}) {
    const currentUser = firebase.auth().currentUser;

    const [profile, setProfile] = useState([]);
    const [updateName,setUpdateName] = useState();
    const [updateSchool,setUpdateSchool] = useState();
    const [updateYear,setUpdateYear] = useState();
    //const [updateEmail,setUpdateEmail] = useState();
    const [updateBio,setUpdateBio] = useState();

    const docRef = firestore().collection('Users').where('_id', "==", currentUser.uid);
    
    //hook(allows you to use state and other React features) in our case here it's
    //used to call the users info
    useEffect(() => {
        const unsubscribe = docRef.onSnapshot((snapshot)=>{
            const profileData = snapshot.docs.map((doc)=>({
                _id: doc.id,
                name: '',
                school: '',
                schoolYear: '',
                //email: '',
                bio: '',
                ...doc.data(),
            }));
            setProfile(profileData);
        });
        return () => unsubscribe();
    }, []);

    //function to handle updating any information that was changed during the edit phase
    function handleButtonPress() {
        if(updateName) {
            firestore().collection('Users').doc(currentUser.uid).update({
                name: updateName
            })
        }
        if(updateSchool) {
            firestore().collection('Users').doc(currentUser.uid).update({
                school: updateSchool
            })
        }
        if(updateYear) {
            firestore().collection('Users').doc(currentUser.uid).update({
                schoolYear: updateYear
            })
        }
        /*
        if(updateEmail) {
            firestore().collection('Users').doc(currentUser.uid).update({
                email: updateEmail
            })
        }
        */
        if(updateBio) {
            firestore().collection('Users').doc(currentUser.uid).update({
                bio: updateBio
            })
        }
        navigation.navigate("About Me Page");
    }

    //return anything to be seen on screen using "<View>" and other react native components 
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <View>
                <Text style = {styles.headerTitle}>Edit profile</Text>
            </View>
            <FlatList   
                data = {profile}
                keyExtractor = {item => item._id}
                renderItem = {({item}) => (
                    <View style={styles.form}> 
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder = {item.name}
                        value = {updateName}
                        onChangeText = {newName => setUpdateName(newName)}
                    />    
                </View>
                )}
            /> 

            <FlatList
                data = {profile}
                keyExtractor = {item => item._id}
                renderItem = {({item}) => (
                    <View style={styles.form}>
                            <Text style={styles.inputTitle}>School</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder = {item.school}
                                    value = {updateSchool}

                                    onChangeText = {newSchool => setUpdateSchool(newSchool)}
                                />
                        </View>
                )}
            />  

            <FlatList
                data = {profile}
                keyExtractor = {item => item._id}
                renderItem = {({item}) => (
                    <View style={styles.form}>
                            <Text style={styles.inputTitle}>School Year</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder = {item.schoolYear}
                                    value = {updateYear}
                                    onChangeText = {newYear => setUpdateYear(newYear)}
                                />
                        </View>
                )}
            />  
{/* Functionality to edit email has been removed to prevent issues with auth
            <FlatList
                data = {profile}
                keyExtractor = {item => item._id}
                renderItem = {({item}) => (
                    <View style={styles.form}>
                            <Text style={styles.inputTitle}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder = {item.email}
                                    multiline = {true}
                                    value = {updateEmail}
                                    onChangeText = {newEmail=> setUpdateEmail(newEmail)}
                                />
                        </View>
                )}
            />   
                */}

            <FlatList
                data = {profile}
                keyExtractor = {item => item._id}
                renderItem = {({item}) => (
                    <View style={styles.boxForm}>
                            <Text style={styles.inputTitle}>Bio</Text>
                                <TextInput
                                    style={styles.boxInput}
                                    placeholder = {item.bio}
                                    multiline = {true}
                                    value = {updateBio}
                                    onChangeText = {newBio => setUpdateBio(newBio)}
                                />
                        </View>
                )}
            />      

            <View>
                <TouchableOpacity
                    style = {styles.editProfileBtn}
                    activeOpacity = {.5}
                    onPress = {handleButtonPress}
                    >
                        <Text style = {styles.buttonText}>Save</Text>
                </TouchableOpacity>
                </View>  
            
        </TouchableWithoutFeedback>
    )
}

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
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    boxForm: {
        marginBottom: 48,
        marginHorizontal: 30,
        height:120,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
    },
    inputTitle:{
        color: "#8A8F9E",
        textTransform: "uppercase", 
    },
    input:{
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    boxInput: {
        height: 40,
        fontSize: 15,
        color: "#161F3D",
    },
    bio:{
        height:80,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
        fontSize: 15,
        color: "#161F3D",
        alignContent: 'flex-start'
    }

});