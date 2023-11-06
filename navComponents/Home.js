import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import Excercises from '../components/Excercises';

export default function Home({ navigation }){

    const Stack = createNativeStackNavigator();

    return(
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Excercises" component={Excercises} />
            </Stack.Navigator>
    )
}