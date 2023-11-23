import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/HomeScreen';
import Excercises from '../pages/Excercises';

export default function Home({ navigation, setExcercises, loggedUser, excercises, saveExcercise, deleteExcercise }){

    const Stack = createNativeStackNavigator();

    return(
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="Excercises">
                    {(props) => <Excercises {...props} saveExcercise={saveExcercise} deleteExcercise={deleteExcercise} loggedUser={loggedUser} setExcercises={setExcercises} excercises={excercises} />}
                </Stack.Screen>
                
            </Stack.Navigator>
    )
}