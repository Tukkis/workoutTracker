import React, { useState } from 'react';
import { Header, Icon, Button, ListItem } from '@rneui/themed';
import { FlatList, TextInput, View, Text } from 'react-native';



export default function SetList ({ data, addSet, removeSetFromExcercise, excerciseId, handleResistanceInput, handleAmountInput}){

    return(
        <View>
            <FlatList 
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) =>
                <View>
                    <View>
                        <Text>{item.amount}</Text>
                        <TextInput
                        label='amount'
                        placeholder='amount'
                        onChangeText={amount =>  handleAmountInput(amount, excerciseId, item)}
                        value={data.sets[index].amount}/>
                        <Text>{item.resistance}</Text>
                        <TextInput
                        label='resistance'
                        placeholder='resistance'
                        onChangeText={resistance => handleResistanceInput(resistance, excerciseId, item)}
                        value={data.sets[index].resistance}/>
                    </View>
                    <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => console.log(item.amount)} />
                </View> 
            }
            data={data.sets.length > 0 ? data.sets : [] }
            />
            <Button icon={{name: 'add'}} onPress={() => addSet(excerciseId)} title="add set" color={'gray'} />
        </View>
  )
}