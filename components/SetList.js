import React, { useState } from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList } from 'react-native';



export default function SetList ({ data, addSet, removeSetFromExcercise}){


    return(
        <Button icon={{name: 'add'}} onPress={() => console.log(data)} title="log data" color={'gray'} /> 
        /* <FlatList 
        keyExtractor={(set, index) => index}
        renderItem={({set}) =>{ 
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{set.amount}</ListItem.Title>
                    <ListItemInput
                    label='amount'
                    placeholder='amount'
                    onChangeText={amount =>  handleAmountInput(amount,i,index)}
                    value={currentWorkOut[i].sets[index].amount}/>
                    <ListItem.Title>{set.resistance}</ListItem.Title>
                    <ListItemInput
                    label='resistance'
                    placeholder='resistance'
                    onChangeText={resistance => handleResistanceInput(resistance,i,index)}
                    value={currentWorkOut[i].sets[index].resistance}/>
                </ListItem.Content>
                <Icon type='material' name='add' style={{color: 'red'}} onPress={() => addSet(i)} />
                <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => removeSetFromExcercise(i,index)} />
            </ListItem> 
            }
        }
        data={data.sets ? data.sets : [] }
        /> */
  )
}