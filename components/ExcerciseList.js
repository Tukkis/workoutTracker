import React, {useState, useEffect} from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList } from 'react-native';

export default function ExcerciseList({data, onPressFunc ,currentWorkOut}){

    const containsId =(id, list) => {
        console.log(id, list)
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return true;
            }
        }
    
        return false;
    }

    return(
        <>
            <FlatList
            keyExtractor={(item, i) => i}
            renderItem={({item}) =>
            !containsId(item.id, currentWorkOut) ? 
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
            <Button icon={{name: 'add'}} onPress={() => console.log(currentWorkOut, data)} title="data" color={'gray'} />
        </>
    )
}