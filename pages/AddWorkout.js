import React, { useState } from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { View } from 'react-native';
import ExcerciseSetList from '../components/ExcerciseSetList';
import ExcerciseList from '../components/ExcerciseList';

export default function AddWorkout({ navigation, saveWorkout, excercises }){

    const [ currentWorkOut, setCurrentWorkOut ] = useState([]);
    const [ addNewState, setAddNewState ] = useState(true)

    const addExcerciseToCurrentWorkOut = (item) => {
        setCurrentWorkOut([...currentWorkOut, {...item, sets:[{amount:'amount', resistance:'resistance'}]}])
    }

    const removeExcerciseFromCurrentWorkOut = (item) => {
        setCurrentWorkOut(currentWorkOut => {
            return currentWorkOut.filter(excercise => excercise.id !== item.id)
        })
    }

    const addSet = (excerciseId) => {
        for(let i = 0; i < currentWorkOut.length; i++){
            if (excerciseId = currentWorkOut[i]){
                const copy = [...currentWorkOut]
                copy[i].sets.push({amount:'', resistance:''})
                setCurrentWorkOut(copy)
            } 
        }
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
    
    const removeSetFromExcercise = () => {
        console.log('')
    }

    return(
        <View>
            { addNewState ? <View>
                <Header centerComponent={{ text: 'Add an excercise to your workout'}} />
                <ExcerciseList data={excercises} onPressFunc={addExcerciseToCurrentWorkOut} currentWorkOut={currentWorkOut}/>
                <Button icon={{name: 'done'}} onPress={() => setAddNewState(false)} title="Back to workout" color={'gray'} /> 
                <Button icon={{name: 'add'}} onPress={() => navigation.navigate('Excercises')} title="Add a new excercise" color={'gray'} /> 
            </View> : 
            <View>
                <ExcerciseSetList addSet={addSet} removeSetFromExcercise={removeSetFromExcercise} data={currentWorkOut} onPressFunc={removeExcerciseFromCurrentWorkOut} filter={false} handleResistanceInput={handleResistanceInput} handleAmountInput={handleAmountInput}/>
                <Button icon={{name: 'add'}} onPress={() => setAddNewState(true)} title="Add an excercise to workout" color={'gray'} /> 
                <Button icon={{name: 'save'}} onPress={() => saveWorkout()} title="save" color={'gray'} />
            </View>}
            
        </View>
    )
}