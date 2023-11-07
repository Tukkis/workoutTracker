import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { onAuthStateChanged } from "firebase/auth";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app, database, getAuth, getApp }from './services/firebase';
import Home from './navComponents/Home';
import AddWorkout from './components/AddWorkout';
import Profile from './components/Profile';
import Login from './components/Login';

export default function App() {

  const [ loggedUser, setLoggedUser ] = useState(false);

  const auth = getAuth(app);

  const Tab = createBottomTabNavigator();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedUser(user)
    } else {
      setLoggedUser(false)
    }
  });

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
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="AddWorkout" component={AddWorkout} />
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
