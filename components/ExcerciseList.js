import React, {useState, useEffect} from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList } from 'react-native';

export default function ExcerciseList({data, onPressFunc ,currentWorkOut, loggedUser}){

    const isNotInCurrentWorkOutAndIsLoggedUsers =(item, list) => {
        if (item.userId != loggedUser.uid){
            return false;
        }
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === item.key) {
                return false;
            }
        }
    
        return true;
    }

    return(
        <>
            <FlatList
            keyExtractor={(item, i) => i}
            renderItem={({item}) =>
            isNotInCurrentWorkOutAndIsLoggedUsers(item, currentWorkOut) ? 
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
        </>
    )
}