import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList, Text, View } from 'react-native';
import SetList from './SetList';

export default function ExcerciseSetList({data, onPressFunc, removeSetFromExcercise, addSet, handleResistanceInput, handleAmountInput}){
    
    return(
        <View style={{paddingTop:15}}>
            <FlatList
            vertical
            keyExtractor={(item, i) => i}
            renderItem={({item}) =>
                <View style={{marginBottom:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'lightblue'}}>
                        <View style={{paddingLeft:15}}>
                            <Text style={{fontSize:16, fontWeight:'bold'}}>{item.name}</Text>
                            <Text style={{color: 'grey'}}>{item.type}</Text>
                        </View>
                        <View style={{width:50, alignSelf:'center'}}>
                            <Button icon={{name:'delete'}} color={'red'} size='sm' onPress={() => onPressFunc(item)} />
                        </View>
                    </View>
                    <SetList data={item} addSet={addSet} removeSetFromExcercise={removeSetFromExcercise} excerciseKey={item.key} handleResistanceInput={handleResistanceInput} handleAmountInput={handleAmountInput} />
                </View>
            }
            data={data}
            />
        </View>
  )
}