import React, {useState} from 'react';
import { Header, Input, Icon, Button, ListItem } from '@rneui/themed';
import { FlatList, View, Text } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';


export default function Excercises({ navigation, loggedUser, excercises, saveExcercise, deleteExcercise }){

    const [ newExcerciseName, setNewExcerciseName ] = useState("")
    const [ newExcerciseType, setNewExcerciseType ] = useState("")
    const [ addNew, setAddnew ] = useState(false)


    const handleSave = () => {
        saveExcercise({name:newExcerciseName, type:newExcerciseType, userId:loggedUser.uid})
        setAddnew(false)
    }

    const isLoggedUsers = (item) => {
        if (item.userId != loggedUser.uid){
            return false;
        }
        return true
    }

    return(
        <>
            <Text style={{marginBottom:10}}></Text>
            {addNew ?
                <View>
                    <Text></Text>
                    <Input
                    label='Name'
                    placeholder='excercise name'
                    onChangeText={excerciseName => setNewExcerciseName(excerciseName)}
                    value={newExcerciseName}/>
                    <Input
                    label='Type'
                    placeholder='excercise type'
                    onChangeText={excerciseType => setNewExcerciseType(excerciseType)}
                    value={newExcerciseType}/>
                    <Button icon={{name: 'add'}} onPress={() => handleSave()} title="add" />
                    <Button icon={{name: 'clear'}} onPress={() => setAddnew(false)} title="Back" color={'red'} />
                </View>
                :
                <ScrollView>
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
                </ScrollView>
            }
        </>
    )
}