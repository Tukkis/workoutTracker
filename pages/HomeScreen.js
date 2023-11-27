import React from 'react';
import WorkoutList from '../components/WorkoutList';

export default function HomeScreen({ navigation, workouts, loggedUser }){

  return(
    <>
      <WorkoutList workouts={workouts} loggedUser={loggedUser}/>
    </>
  )
}