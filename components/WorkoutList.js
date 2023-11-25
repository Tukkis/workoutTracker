import React, {useState} from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList, Text, View } from 'react-native';

export default function WorkoutList({ navigation, workouts }){

    const [selected, setSelected] = useState(false)

    return(
        <FlatList
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) =>
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
                data={selected}
                />
                </>
                :
                <>
                <Text>workout {index}</Text>
                <Button onPress={() => setSelected(item.workout[index])} title="Select" color={'gray'} />
                </>
                }
            </>
        }
        data={workouts}
        />
    )
}