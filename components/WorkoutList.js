import React, {useState} from 'react';
import {Button} from '@rneui/themed';
import { FlatList, Text, View, Dimensions } from 'react-native';
import WorkoutChart from './WorkoutChart';

export default function WorkoutList({ navigation, workouts, loggedUser }){

    const [selected, setSelected] = useState(false)
    
    return(
        <>
        {
        selected ? 
        <>
        <Button icon={{name: 'clear'}} onPress={() => setSelected(false)} title="Back" color={'gray'} />
        <FlatList 
        keyExtractor={(item, i) => i}
        renderItem={({item}) =>
            <>
                <Text>{item.name}</Text>
                <Text>{item.type}</Text>
                <FlatList 
                keyExtractor={(item, i) => i}
                renderItem={({item}) =>
                    <>
                    <Text>reps resistance</Text>
                    <Text>{item.amount} {item.resistance}</Text>
                    </>
                }
                data={item.sets}
                />
                <Text></Text>
            </>
        }
        data={selected[0]}
        />
        </>
        :
        <>
        <WorkoutChart workouts={workouts} loggedUser={loggedUser}/>
        <FlatList
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) =>
            <Button onPress={() => setSelected(item.workout)} title={"workout " + workouts[index].date} color={'gray'} />
        }
        data={workouts}
        />
        </>
        }
        
    </>
    )

}