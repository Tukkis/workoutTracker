import React, { useState } from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { View,Text } from 'react-native';
import { app, getAuth }from '../services/firebase';

export default function Login({ loggedUser, setLoggedUser }){

    const [ newUser, setNewUser ] = useState(false);
    const [ inputUsername, setInputUsername ] = useState('');
    const [ inputPassword, setInputPassword ] = useState('');
    const [ inputEmail, setInputEmail ] = useState('')


    const auth = getAuth(app);
  
    const createNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoggedUser(userCredential.user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    console.error(error);
                }
            });
    }

    const loginUser = () => {
        signInWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    

    return(
        <View>
            {newUser ? 
            <View>
                <Header centerComponent={{ text: 'Register'}} />
                <Input
                    label='Username'
                    placeholder='Username'
                    onChangeText={username => setInputUsername(username)}
                    value={inputUsername}/>
                <Input
                    label='Password'
                    placeholder='Password'
                    onChangeText={password => setInputPassword(password)}
                    value={inputPassword}/>
                <Input
                    label='Email'
                    placeholder='Email'
                    onChangeText={email => setInputEmail(email)}
                    value={inputEmail}/>
                <Button onPress={() => createNewUser(inputEmail, inputPassword)} title="Register user"></Button>       
                <Button onPress={() => setNewUser(false)} title="Existing user?"></Button>
            </View> 
            :
            <View>
                <Header centerComponent={{ text: 'Login'}} />
                <Input
                    label='Email'
                    placeholder='Email'
                    onChangeText={email => setInputEmail(email)}
                    value={inputEmail}/>
                <Input
                    label='Password'
                    placeholder='Password'
                    onChangeText={password => setInputPassword(password)}
                    value={inputPassword}/>
                <Button onPress={() => loginUser()} title="Login"></Button>
                <Button onPress={() => setNewUser(true)} title="New User?"></Button>
            </View> 
            }
            
            

        </View>
    )
}