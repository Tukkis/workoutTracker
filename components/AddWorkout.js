import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList, View } from 'react-native';

export default function AddWorkout({ navigation, saveWorkout, excercises, deleteExcercise }){
    return(
        <View>
            <FlatList
            keyExtractor={(item, index) => index}
            renderItem={({item}) =>
                <ListItem>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{color: 'grey'}}>{item.type}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => deleteExcercise(item.key)} />
                </ListItem>
            }
            data={excercises}
            />
            <Button icon={{name: 'map'}} onPress={() => navigation.navigate('Excercises')} title="Add excercise" color={'gray'} />
            <Button icon={{name: 'save'}} onPress={() => saveWorkout()} title="save" color={'gray'} />
        </View>
    )
}