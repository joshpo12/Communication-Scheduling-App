import * as firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQDmc-GSlwzY0QVZB0ex3_pnbfpwhO_Hk",
    authDomain: "lincoln-gold-mobile-app.firebaseapp.com",
    databaseURL: "https://lincoln-gold-mobile-app-default-rtdb.firebaseio.com",
    projectId: "lincoln-gold-mobile-app",
    storageBucket: "lincoln-gold-mobile-app.appspot.com",
    messagingSenderId: "1079193841389",
    appId: "1:1079193841389:web:fca8de25fc188f17fde6e4"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
