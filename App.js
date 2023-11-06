import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './navComponents/Home'
import AddWorkout from './components/AddWorkout';
import Profile from './components/Profile';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Home" 
      screenOptions={{
        headerShown: false
      }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="AddWorkout" component={AddWorkout} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
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
