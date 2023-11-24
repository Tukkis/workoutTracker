import React, { useState } from 'react';
import { Header, Icon, Button, ListItem } from '@rneui/themed';
import { FlatList, TextInput, View, Text } from 'react-native';



export default function SetList ({ data, addSet, removeSetFromExcercise, excerciseKey, handleAmountInput, handleResistanceInput }){

    return(
        <View>
            <FlatList 
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) =>
                <View>
                    <View>
                        <Text>Reps</Text>
                        <TextInput
                        label='amount'
                        placeholder='amount'
                        onChangeText={amount =>  handleAmountInput(amount, excerciseKey, index)}
                        value={data.sets[index].amount}/>
                        <Text>Resistance</Text>
                        <TextInput
                        label='resistance'
                        placeholder='resistance'
                        onChangeText={resistance => handleResistanceInput(resistance, excerciseKey, index)}
                        value={data.sets[index].resistance}/>
                    </View>
                    <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => removeSetFromExcercise(index, excerciseKey)} />
                </View> 
            }
            data={data.sets.length > 0 ? data.sets : [] }
            />
            <Button icon={{name: 'add'}} onPress={() => addSet(excerciseKey)} title="add set" color={'gray'} />
        </View>
  )
}