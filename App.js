import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from "firebase/auth";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { push, ref, onValue, remove } from 'firebase/database';
import { app, database, getAuth, getApp }from './services/firebase';
import Workout from './navComponents/Workout';
import AddWorkout from './pages/AddWorkout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import HomeScreen from './pages/HomeScreen';

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
    const excercisesRef = ref(database, 'excercises/');
    onValue(excercisesRef, (snapshot) => {
      const data = snapshot.val();
      const excercisesData = data ? Object.keys(data).map(key => ({key, ...data[key]})) : [];
      setExcercises(excercisesData);
    })
  }

  const getWorkouts = () => {
    const workoutsRef = ref(database, 'workouts/');
    onValue(workoutsRef, (snapshot) => {
      const data = snapshot.val();
      const workoutsData = data ? Object.keys(data).map(key => ({key, ...data[key]})) : [];
      setWorkouts(workoutsData);
    })
  }

  useEffect(() => {
    getExcercises()
    getWorkouts()
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
          {(props) => <HomeScreen {...props}  workouts={workouts} loggedUser={loggedUser} />}
          </Tab.Screen>
          <Tab.Screen name="Workout">
          {(props) => <Workout {...props} setExcercises={setExcercises} saveExcercise={saveExcercise} workouts={workouts} saveWorkout={saveWorkout} excercises={excercises} deleteExcercise={deleteExcercise} loggedUser={loggedUser} />}
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
