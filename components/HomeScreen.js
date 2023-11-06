import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';

export default function Profile({ navigation }){
    return(
        <Button icon={{name: 'save'}} onPress={() => navigation.navigate('Excercises')} title="Excercises" color={'gray'} />
  )
}