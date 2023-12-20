import React, { useState } from 'react';
import { Header, Input, Button } from '@rneui/themed';
import { Text, View, Alert } from 'react-native';
import { app, getAuth }from '../services/firebase';
import { updateProfile, signOut } from "firebase/auth";


export default function Profile({ navigation, loggedUser }){

    const [ editMode, setEditMode ] = useState(false);
    const [ inputUsername, setInputUsername ] = useState('');

    const auth = getAuth(app);

    const updateLoggedUser = () => {
        updateProfile(auth.currentUser, {
            displayName: inputUsername
          }).then(() => {
            setEditMode(false)
          }).catch((error) => {
            // An error occurred
            // ...
          }); 
    }
    
    const logOut = () => {
        Alert.alert(
            'You are about to log out!', 'Are you sure you want to log out?',
            [
              {text: 'NO', onPress: () => '', style: 'cancel'},
              {text: 'YES', onPress: () => signOut(auth)},
            ]
        )
    }

    return(
        <View>
        {!editMode ? 
            <View>
                <Header centerComponent={{ text: 'Profile'}} />
                <Text style={{marginLeft: 10, fontSize:20}}>Email: {loggedUser.email}</Text>
                <Text style={{marginLeft: 10, fontSize:20}}>Username: {loggedUser.displayName}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <Button onPress={() => setEditMode(true)} title={'Edit profile'}></Button>
                    <Button onPress={() => logOut()} title={'Logout'}></Button>
                </View>
            </View>  
            : 
            <View>
                <Header centerComponent={{ text: 'Profile'}} />
                <Button onPress={() => setEditMode(false)} title={'Cancel'}></Button>
                <Text style={{marginLeft: 10, fontSize:20}}>{loggedUser.email}</Text>
                <Input
                    label='Username'
                    placeholder='Username'
                    onChangeText={username => setInputUsername(username)}
                    value={inputUsername}/>
                <Button onPress={() => updateLoggedUser()} title={'Confirm'}></Button>
            </View>  
        }
        </View>
    )
}