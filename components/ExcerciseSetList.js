import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList } from 'react-native';
import SetList from './SetList';

export default function ExcerciseSetList({data, onPressFunc, removeSetFromExcercise, addSet, handleResistanceInput, handleAmountInput}){
    return(
        <FlatList
        keyExtractor={(item, i) => i}
        renderItem={({item}) =>
            <ListItem style={{display:'block'}}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{color: 'grey'}}>{item.type}</ListItem.Subtitle>
                <SetList data={item} addSet={addSet} removeSetFromExcercise={removeSetFromExcercise} excerciseKey={item.key} handleResistanceInput={handleResistanceInput} handleAmountInput={handleAmountInput} />
            </ListItem.Content>
            <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => onPressFunc(item)} />
            </ListItem>
        }
        data={data}
        />
  )
}