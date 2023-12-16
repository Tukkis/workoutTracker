import React, {useState} from 'react';
import {Header, Button} from '@rneui/themed';
import { FlatList, Text, View } from 'react-native';
import WorkoutChart from './WorkoutChart';

export default function WorkoutList({ navigation, workouts, loggedUser }){

    const [selected, setSelected] = useState(false)
    
    return(
        <>
        <Header centerComponent={{text: "Welcome to the workoutList app"}} />
        {
        selected ? 
        <>
        <Button icon={{name: 'clear'}} onPress={() => setSelected(false)} title="Back" color={'gray'} />
        <FlatList 
        keyExtractor={(item, i) => i}
        renderItem={({item}) =>
            <View>
                <Text style={{textAlign: 'center', paddingTop:5, fontSize:16, fontWeight:'bold'}}>Excercise: {item.name}</Text>
                <Text style={{textAlign: 'center', paddingBottom:15, fontSize:16}}>Type: {item.type}</Text>
                <FlatList 
                keyExtractor={(item, i) => i}
                renderItem={({item}) =>
                    <View style={{borderTopWidth: 1, padding: 3, flexDirection:"row", flex: 1, alignItems:'stretch', justifyContent:'space-evenly'}}>
                        <View>
                            <Text>reps</Text>
                            <Text style={{justifyContent: 'flex-start'}}>{item.amount}</Text>
                        </View>
                        <View>
                            <Text>resistance</Text>
                            <Text style={{justifyContent: 'flex-end'}}>{item.resistance}</Text>
                        </View>
                    </View>
                }
                data={item.sets}
                />
                <Text style={{borderTopWidth:1}}></Text>
            </View>
        }
        data={selected[0]}
        />
        </>
        :
        <>
        <WorkoutChart workouts={workouts} loggedUser={loggedUser}/>
        <Text>Your workouts</Text>
        <FlatList
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) =>{
            if(loggedUser.uid === item.userId){
                return(
                    <Button onPress={() => setSelected(item.workout)} title={"workout " + workouts[index].date} color={'gray'} />
                )
            }}
        }
        data={workouts}
        />
        </>
        }
        
    </>
    )

}