import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { onAuthStateChanged } from "firebase/auth";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { push, ref, onValue, remove } from 'firebase/database';
import { app, database, getAuth, getApp }from './services/firebase';
import Home from './navComponents/Home';
import AddWorkout from './pages/AddWorkout';
import Profile from './pages/Profile';
import Login from './pages/Login';

export default function App() {

  const [ loggedUser, setLoggedUser ] = useState(null);
  const [ workouts, setWorkouts ] = useState([])
  const [ excercises, setExcercises ] = useState([/* {name: "Bench press", type: "Weight training", id: 1}, {name:"Spinning", type:"Cardio", id: 2} */])

  const auth = getAuth(app);

  const Tab = createBottomTabNavigator();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedUser(user)
    } else {
      setLoggedUser(false)
    }
  });

  const getExcercises = () => {
    const workoutsRef = ref(database, 'excercises/');
    onValue(workoutsRef, (snapshot) => {
      const data = snapshot.val();
      const workoutsData = data ? Object.keys(data).map(key => ({key, ...data[key]})) : [];
      setExcercises(workoutsData);
    })
  }

  useEffect(() => {
    getExcercises()
  }, []);
    

  const saveWorkout = (item) => {
    push(ref(database, 'workouts/'), item);
  }

  const deleteWorkout = (key) => {
    remove(ref(database, 'workouts/' + key));
  }

  const saveExcercise = (item) => {
    push(ref(database, 'excercises/'), item);
  }

  const deleteExcercise = (key) => {
    remove(ref(database, 'excercises/' + key));
  }



  return (
    <SafeAreaProvider>
      {loggedUser ? 
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName={"Home"} 
        screenOptions={{
          headerShown: false
        }}
        >
          <Tab.Screen name="Home">
          {(props) => <Home {...props} saveExcercise={saveExcercise} deleteExcercise={deleteExcercise} loggedUser={loggedUser} setExcercises={setExcercises} excercises={excercises} />}
          </Tab.Screen>
          <Tab.Screen name="AddWorkout">
          {(props) => <AddWorkout {...props} saveWorkout={saveWorkout} excercises={excercises} deleteExcercise={deleteExcercise} />}
          </Tab.Screen>
          <Tab.Screen name="Profile">
          {(props) => <Profile {...props} loggedUser={loggedUser} />}
          </Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
    : 
    <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
    }
  </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
