import React, {useState, useEffect} from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList } from 'react-native';

export default function ExcerciseList({data, onPressFunc ,currentWorkOut}){

    return(
        <FlatList
        keyExtractor={(item, i) => i}
        renderItem={({item}) =>
            currentWorkOut.some(excercise => excercise.id === item.id) ? 
            <ListItem>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{color: 'grey'}}>{item.type}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon type='material' name='add' style={{color: 'red'}} onPress={() => onPressFunc(item)} />
            </ListItem>
            : ''
        }
        data={data}
        />
    )
}