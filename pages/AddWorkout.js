import React, { useState } from 'react';
import { Header, Button } from '@rneui/themed';
import { View, Text, Alert } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import ExcerciseSetList from '../components/ExcerciseSetList';
import ExcerciseList from '../components/ExcerciseList';

export default function AddWorkout({ navigation, saveWorkout, excercises, loggedUser }){

    const [ currentWorkOut, setCurrentWorkOut ] = useState([]);
    const [ addNewState, setAddNewState ] = useState(true)

    const addExcerciseToCurrentWorkOut = (item) => {
        setAddNewState(false)
        setCurrentWorkOut([...currentWorkOut, {...item, sets:[{amount:'', resistance:''}]}])
    }

    const removeExcerciseFromCurrentWorkOut = (item) => {
        Alert.alert(
            'Removing excercise!', 'Are you sure you want to remove excercise from workout?',
            [
                {text: 'NO', onPress: () => '', style: 'cancel'},
                {text: 'YES', onPress: () => {
                    setCurrentWorkOut(currentWorkOut => {
                        return currentWorkOut.filter(excercise => excercise.key !== item.key)
                    })
                }},
            ]
        )
        
    }

    const handleSave = () => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        Alert.alert(
            'Saving workout', 'Are you done with your workout?',
            [
                {text: 'NO', onPress: () => '', style: 'cancel'},
                {text: 'YES', onPress: () => {
                    saveWorkout({date:currentDate, userId:loggedUser.uid, workout:[currentWorkOut]})
                    setCurrentWorkOut([])
                }},
            ]
        )
        
    }

    const addSet = (excerciseKey) => {
        for(let i = 0; i < currentWorkOut.length; i++){
            if (excerciseKey === currentWorkOut[i].key){
                const copy = [...currentWorkOut]
                copy[i].sets.push({amount:'', resistance:''})
                setCurrentWorkOut(copy)
            } 
        }
    }

    const handleAmountInput = (value,excerciseKey,setIndex) => {
        for(let i = 0; i < currentWorkOut.length; i++){
            if (excerciseKey === currentWorkOut[i].key){
                const copy = [...currentWorkOut]
                copy[i].sets[setIndex].amount = value;
                setCurrentWorkOut(copy)
            } 
        }
    }

    const handleResistanceInput = (value,excerciseKey,setIndex) => {
        for(let i = 0; i < currentWorkOut.length; i++){
            if (excerciseKey === currentWorkOut[i].key){
                const copy = [...currentWorkOut]
                copy[i].sets[setIndex].resistance = value;
                setCurrentWorkOut(copy)
            } 
        }
    }
    
    const removeSetFromExcercise = (setIndex,excerciseKey) => {
        Alert.alert(
            'Removing set!', 'Are you sure you want to remove set from excercise?',
            [
                {text: 'NO', onPress: () => '', style: 'cancel'},
                {text: 'YES', onPress: () => {
                for(let i = 0; i < currentWorkOut.length; i++){
                    if (excerciseKey === currentWorkOut[i].key){
                        const copy = [...currentWorkOut]
                        copy[i].sets.splice(setIndex, 1)
                        setCurrentWorkOut(copy)
                    } 
                }
                }},
            ]
        )
    }

    return(
        <ScrollView>
        <View style={{flexGrow: 1}}>
            { addNewState ? <View>
                <Header centerComponent={{ text: 'Add an excercise to your workout'}} />
                <Button icon={{name: 'done'}} onPress={() => setAddNewState(false)} title="Back to workout" /> 
                <ExcerciseList data={excercises} onPressFunc={addExcerciseToCurrentWorkOut} currentWorkOut={currentWorkOut} loggedUser={loggedUser}/>
                <Button icon={{name: 'add'}} onPress={() => navigation.navigate('Excercises')} title="Add or delete excercises" /> 
            </View> : 
            <View>
                <Text style={{paddingTop:15}}></Text>
                <ExcerciseSetList addSet={addSet} removeSetFromExcercise={removeSetFromExcercise} data={currentWorkOut} onPressFunc={removeExcerciseFromCurrentWorkOut} filter={false} handleResistanceInput={handleResistanceInput} handleAmountInput={handleAmountInput}/>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <Button icon={{name: 'add'}} onPress={() => setAddNewState(true)} title="Add an excercise to workout" /> 
                    <Button onPress={() => handleSave()} title="Save workout" color={'green'}/>
                </View>
            </View>}
            
        </View>
        </ScrollView>
    )
}