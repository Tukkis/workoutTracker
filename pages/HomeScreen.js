import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import WorkoutList from '../components/WorkoutList';

export default function HomeScreen({ navigation, workouts, loggedUser }){

  return(
    <>
      <WorkoutList workouts={workouts} loggedUser={loggedUser}/>
    </>
  )
}