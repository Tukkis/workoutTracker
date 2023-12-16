import React, { useState } from 'react';
import { Header, Icon, Button, ListItem } from '@rneui/themed';
import { FlatList, TextInput, View, Text } from 'react-native';



export default function SetList ({ data, addSet, removeSetFromExcercise, excerciseKey, handleAmountInput, handleResistanceInput }){

    let defaultTemp={editingIndex:-1,text:''}

    let [amountTemp,setAmountTemp] = useState(defaultTemp); 
    let [resistanceTemp,setResistanceTemp] = useState(defaultTemp);

    return(
        <View>
            <FlatList 
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) =>
                <View style={{paddingTop:15}}>
                    <View style={{flexDirection:'row', alignContent:'stretch', paddingBottom:5}}>
                        <View style={{flexDirection:'row',  marginRight:'auto'}}>
                            <Icon style={{width:50, height:50, paddingTop:15}}  name='cancel' onPress={() => removeSetFromExcercise(index, excerciseKey)} />
                            <View>
                                <Text>Reps</Text>
                                <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                label='amount'
                                placeholder='amount'
                                keyboardType='number-pad'
                                onFocus={()=>setAmountTemp({editingIndex:index,text:data.sets[index].amount})}
                                onBlur={()=>{
                                    console.log(amountTemp.text)
                                    handleAmountInput(amountTemp.text, excerciseKey, index)
                                    setAmountTemp(defaultTemp)
                                    }
                                }
                                onChangeText={text => setAmountTemp({text,editingIndex:index})}
                                value={amountTemp.editingIndex===index?amountTemp.text:data.sets[index].amount/* data.sets[index].amount */}/>
                            </View>
                        </View>
                        <View style={{ marginRight:'auto'}}>
                            <Text>Resistance</Text>
                            <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            label='resistance'
                            keyboardType='number-pad'
                            placeholder='resistance'
                            onFocus={()=>setResistanceTemp({editingIndex:index,text:data.sets[index].resistance})}
                            onBlur={()=>{
                                console.log(resistanceTemp.text)
                                handleResistanceInput(resistanceTemp.text, excerciseKey, index)
                                setResistanceTemp(defaultTemp)
                                }
                            }
                            onChangeText={text => setResistanceTemp({text,editingIndex:index})}
                            value={resistanceTemp.editingIndex===index?resistanceTemp.text:data.sets[index].resistance}/>
                        </View>
                    </View>
                </View> 
            }
            data={data.sets.length > 0 ? data.sets : [] }
            />
            <View style={{width: 150, alignSelf:'center', paddingBottom:5}}>
                <Button icon={{name: 'add'}} onPress={() => addSet(excerciseKey)} title="add set" />
            </View>
        </View>
  )
}