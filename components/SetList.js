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
                <View>
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
                    <Icon type='material' name='delete' style={{color: 'red'}} onPress={() => removeSetFromExcercise(index, excerciseKey)} />
                </View> 
            }
            data={data.sets.length > 0 ? data.sets : [] }
            />
            <Button icon={{name: 'add'}} onPress={() => addSet(excerciseKey)} title="add set" color={'gray'} />
        </View>
  )
}