import React, { useState } from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList, View } from 'react-native';

export default function AddWorkout({ navigation, saveWorkout, excercises }){

    const [ currentWorkOut, setCurrentWorkOut ] = useState([]);
    const [ addNewState, setAddNewState ] = useState(true)

    const addExcerciseToCurrentWorkOut = (item) => {
        setCurrentWorkOut([...currentWorkOut, {...item, sets:[{amount:'f', resistance:''}]}])
        console.log(currentWorkOut, item)
    }

    const removeExcerciseFromCurrentWorkOut = (item) => {
        setCurrentWorkOut(currentWorkOut => {
            return currentWorkOut.filter(excercise => excercise !== item)
        })
    }

    const addSet = (excerciseIndex) => {
        const copy = [...currentWorkOut]
        copy[excerciseIndex].sets.push({amount:'', resistance:''})
    }

    const handleAmountInput = (value,excerciseIndex,setIndex) => {
        const copy = [...currentWorkOut]
        copy[excerciseIndex].sets[setIndex].amount = value;
        setCurrentWorkOut(copy)
    }

    const handleResistanceInput = (value,excerciseIndex,setIndex) => {
        const copy = [...currentWorkOut]
        copy[excerciseIndex].sets[setIndex].resistance = value;
        setCurrentWorkOut(copy)
    }

    return(
        <View>
            { addNewState ? <View>
                <Header centerComponent={{ text: 'Add an excercise to your workout'}} />
                <FlatList
                keyExtractor={(item, index) => index}
                renderItem={({item}) =>
                currentWorkOut.filter(excercise => excercise !== item) ?
                    <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'grey'}}>{item.type}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon type='material' name='add' style={{color: 'red'}} onPress={() => addExcerciseToCurrentWorkOut(item)} />
                    </ListItem>
                    : ''
                }
                data={excercises}
                />
                <Button icon={{name: 'done'}} onPress={() => setAddNewState(false)} title="Back to workout" color={'gray'} /> 
                <Button icon={{name: 'add'}} onPress={() => navigation.navigate('Excercises')} title="Add a new excercise" color={'gray'} /> 
            </View> : 
            <View>
                <FlatList
                keyExtractor={(item, i) => i}
                renderItem={({item}) =>
                    <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'grey'}}>{item.type}</ListItem.Subtitle>
                        <FlatList 
                        keyExtractor={(item2, index) => index}
                        renderItem={({item2}) =>{ 
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Title>{item2.amount}</ListItem.Title>
                                    <ListItemInput
                                    label='amount'
                                    placeholder='amount'
                                    onChangeText={amount => handleAmountInput(amount,i,index)}
                                    value={currentWorkOut[i].sets[index].amount}/>
                                    <ListItem.Title>{item2.resistance}</ListItem.Title>
                                    <ListItemInput
                                    label='resistance'
                                    placeholder='resistance'
                                    onChangeText={amount => handleResistanceInput(amount,i,index)}
                                    value={currentWorkOut[i].sets[index].resistance}/>
                                </ListItem.Content>
                                <Icon type='material' name='add' style={{color: 'red'}} onPress={() => addSet(i)} />
                                <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => removeSetFromExcercise(i,index)} />
                            </ListItem> 
                            }
                        }
                        data={item.sets ? item.sets : [] }
                        />
                    </ListItem.Content>
                    <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => removeExcerciseFromCurrentWorkOut(workOut)} />
                    </ListItem>
                }
                data={currentWorkOut}
                />
                <Button icon={{name: 'add'}} onPress={() => setAddNewState(true)} title="Add an excercise to workout" color={'gray'} /> 
                <Button icon={{name: 'save'}} onPress={() => saveWorkout()} title="save" color={'gray'} />
            </View>}
            
        </View>
    )
}