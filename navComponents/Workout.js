import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Excercises from '../pages/Excercises';
import AddWorkout from '../pages/AddWorkout';

export default function Workout({ navigation, setExcercises, loggedUser, excercises, saveExcercise, deleteExcercise, workouts, saveWorkout }){

    const Stack = createNativeStackNavigator();

    return(
            <Stack.Navigator screenOptions={{
                headerShown: false
              }}>
                <Stack.Screen name="AddWorkout">
                    {(props) => <AddWorkout {...props} workouts={workouts} loggedUser={loggedUser} saveWorkout={saveWorkout} excercises={excercises}/>}
                </Stack.Screen>
                <Stack.Screen name="Excercises">
                    {(props) => <Excercises {...props} saveExcercise={saveExcercise} deleteExcercise={deleteExcercise} loggedUser={loggedUser} setExcercises={setExcercises} excercises={excercises} />}
                </Stack.Screen>
                
            </Stack.Navigator>
    )
}