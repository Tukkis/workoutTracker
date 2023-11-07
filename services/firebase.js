import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBVBuIob_8vZ-Tnf5mJ0VI_zV03sY03GYk",
    authDomain: "ostoslistahhdb.firebaseapp.com",
    databaseURL: "https://ostoslistahhdb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ostoslistahhdb",
    storageBucket: "ostoslistahhdb.appspot.com",
    messagingSenderId: "626461195782",
    appId: "1:626461195782:web:1c6c71117ea73bd0accd87",
    measurementId: "G-R1WCYMKBFQ"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const database = getDatabase(app);

export { app, database, getApp, getAuth };