import React, {useState} from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList, View, Text } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';


export default function Excercises({ navigation, setExcercises, loggedUser, excercises, saveExcercise, deleteExcercise }){


    const [ newExcercise, setNewExcercise ] = useState({name: "", type: "", userId:loggedUser.uid})
    const [ addNew, setAddnew ] = useState(false)


    const handleSave = () => {
        saveExcercise(newExcercise)
        setAddnew(false)
    }

    const isLoggedUsers = (item) => {
        if (item.userId != loggedUser.uid){
            return false;
        }
        return true
    }

    return(
        <ScrollView>
            <Text></Text>
            {addNew ?
                <View>
                    <Text></Text>
                    <Input
                    label='Name'
                    placeholder='excercise name'
                    onChangeText={excerciseName => setNewExcercise({...newExcercise, name: excerciseName})}
                    value={newExcercise.name}/>
                    <Input
                    label='Type'
                    placeholder='excercise type'
                    onChangeText={excerciseType => setNewExcercise({...newExcercise, type: excerciseType})}
                    value={newExcercise.type}/>
                    <Button icon={{name: 'add'}} onPress={() => handleSave()} title="add" />
                    <Button icon={{name: 'clear'}} onPress={() => setAddnew(false)} title="Back" color={'red'} />
                </View>
                :
                <>
                <FlatList
                keyExtractor={(item, i) => i}
                renderItem={({item}) =>
                    isLoggedUsers(item) ?
                    <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={{color: 'grey'}}>{item.type}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => deleteExcercise(item.key)} />
                    </ListItem>
                    :
                    ''
                }
                data={excercises}
                />
                <Button icon={{name: 'add'}} onPress={() => setAddnew(true)} title="addNew" />
                </>
            }
        </ScrollView>
    )
}