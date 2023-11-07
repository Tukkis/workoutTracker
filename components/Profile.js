import React, { useState } from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { Text, View, Image, Alert } from 'react-native';
import { app, database, getAuth }from '../services/firebase';
import { updateProfile, signOut } from "firebase/auth";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function Profile({ navigation, loggedUser }){

    const [ editMode, setEditMode ] = useState(false);
    const [ inputUsername, setInputUsername ] = useState('');

    const auth = getAuth(app);

    const updateLoggedUser = () => {
        updateProfile(auth.currentUser, {
            displayName: inputUsername, photoURL: "https://reactnative.dev/img/tiny_logo.png"
          }).then(() => {
            // Profile updated!
            // ...
            console.log(loggedUser)
          }).catch((error) => {
            // An error occurred
            // ...
          }); 
    }
    
    const logOut = () => {
        Alert.alert(
            'Alert Title',
            'Alert message here...',
            [
              {text: 'NO', onPress: () => '', style: 'cancel'},
              {text: 'YES', onPress: () => signOut(auth)},
            ]
        )
    }

    return(
        <View>
        {editMode ? 
            <View>
                <Header centerComponent={{ text: 'Profile'}} />
                <Button onPress={() => logOut()} title={'Logout'}></Button>
                <Image
                    style={{width: 50, height: 50}}
                    source={{ uri: loggedUser.photoURL }}
                    PlaceholderContent={<Text>image</Text>}
                />
                <Text>{loggedUser.email}</Text>
                <Text>{loggedUser.displayName}</Text>
                <Button onPress={() => setEditMode(false)} title={'Edit profile'}></Button>
            </View>  
            : 
            <View>
                <Header centerComponent={{ text: 'Profile'}} />
                <Button onPress={() => setEditMode(true)} title={'Cancel'}></Button>
                <Text>{loggedUser.email}</Text>
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