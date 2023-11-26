import React, { useState } from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { View } from 'react-native';
import ExcerciseSetList from '../components/ExcerciseSetList';
import ExcerciseList from '../components/ExcerciseList';

export default function AddWorkout({ navigation, saveWorkout, excercises, loggedUser }){

    const [ currentWorkOut, setCurrentWorkOut ] = useState([]);
    const [ addNewState, setAddNewState ] = useState(true)

    const addExcerciseToCurrentWorkOut = (item) => {
        setCurrentWorkOut([...currentWorkOut, {...item, sets:[{amount:'', resistance:''}]}])
    }

    const removeExcerciseFromCurrentWorkOut = (item) => {
        setCurrentWorkOut(currentWorkOut => {
            return currentWorkOut.filter(excercise => excercise.key !== item.key)
        })
    }

    const handleSave = () => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        saveWorkout({date:currentDate, userId:loggedUser.uid, workout:[currentWorkOut]})
        setCurrentWorkOut([])
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
        for(let i = 0; i < currentWorkOut.length; i++){
            if (excerciseKey === currentWorkOut[i].key){
                const copy = [...currentWorkOut]
                copy[i].sets.splice(setIndex, 1)
                setCurrentWorkOut(copy)
            } 
        }
    }

    return(
        <View>
            { addNewState ? <View>
                <Header centerComponent={{ text: 'Add an excercise to your workout'}} />
                <ExcerciseList data={excercises} onPressFunc={addExcerciseToCurrentWorkOut} currentWorkOut={currentWorkOut} loggedUser={loggedUser}/>
                <Button icon={{name: 'done'}} onPress={() => setAddNewState(false)} title="Back to workout" color={'gray'} /> 
                <Button icon={{name: 'add'}} onPress={() => navigation.navigate('Excercises')} title="Add a new excercise" color={'gray'} /> 
            </View> : 
            <View>
                <ExcerciseSetList addSet={addSet} removeSetFromExcercise={removeSetFromExcercise} data={currentWorkOut} onPressFunc={removeExcerciseFromCurrentWorkOut} filter={false} handleResistanceInput={handleResistanceInput} handleAmountInput={handleAmountInput}/>
                <Button icon={{name: 'add'}} onPress={() => setAddNewState(true)} title="Add an excercise to workout" color={'gray'} /> 
                <Button icon={{name: 'save'}} onPress={() => handleSave()} title="save" color={'gray'} />
            </View>}
            
        </View>
    )
}