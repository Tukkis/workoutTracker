import React from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList, Text, View } from 'react-native';

export default function HomeScreen({ navigation, workouts }){
    return(
      <>
        <FlatList
        keyExtractor={(item, i) => i}
        renderItem={({item}) =>
          <View>
            <Button icon={{name: 'cancel'}} onPress={() => console.log(item)} title="log item" color={'gray'} />
          </View>
        }
        data={workouts}
        />
        <Button icon={{name: 'save'}} onPress={() => navigation.navigate('Excercises')} title="Excercises" color={'gray'} />
      </>
  )
}