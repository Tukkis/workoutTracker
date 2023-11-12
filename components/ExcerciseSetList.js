import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList } from 'react-native';
import SetList from './SetList';

export default function ExcerciseSetList({data, onPressFunc, removeSetFromExcercise, addSet}){
    return(
        <FlatList
                keyExtractor={(item, i) => i}
                renderItem={({item}) =>
                    <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'grey'}}>{item.type}</ListItem.Subtitle>
                        <SetList data={item} addSet={addSet} removeSetFromExcercise={removeSetFromExcercise} />
                    </ListItem.Content>
                    <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => onPressFunc(item)} />
                    </ListItem>
                }
                data={data}
                />
  )
}