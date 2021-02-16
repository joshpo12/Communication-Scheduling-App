import React, { useState, useContext, useEffect } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import firebase from '../database/firebase.js';
import { firestore } from 'firebase';

export default function Chat({route}) {
    const currentUser = firebase.auth().currentUser
    const [messages, setMessages] = useState([]);

    const {thread} = route.params;

    //helper to handle sending message
    async function handleSend(messages) {
        const text = messages[0].text;

        firestore().collection('chat')
        .doc(thread._id)
        .collection('Messages')
        .add({
            text,
            createdAt: new Date().getTime(),
            user: {
                _id: currentUser.uid,
                email: currentUser.email
            }
        });

        await firestore()
            .collection('chat')
            .doc(thread._id)
            .set({
                latestMessage: {
                    text,
                    createdAt: new Date().getTime()
                }
            },
                {merge:true}
            );
    }

    useEffect(() => {
        const messageListener = firestore().collection('chat')
            .doc(thread._id)
            .collection('Messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data();
                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    };

                    if(!firebaseData.system) {
                        data.user = {
                            ...firebaseData.user,
                            name: firebaseData.user.email
                        };
                    }

                    return data;
                });

                setMessages(messages);
            });

            return () => messageListener();
    }, []);

    function renderBubble(props) {
        return(
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#F5B0C2'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        );
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={StyleSheet.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#F5B0C2' />
                </View>
            </Send>
        );
    }


    return(
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{ _id: currentUser.uid }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
        />
    );
}