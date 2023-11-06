import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';

export default function Calendar({ navigation }){
    return(
        <Button icon={{name: 'save'}} onPress={() => navigation.navigate('Home')} title="Home" color={'gray'} />
    )
}