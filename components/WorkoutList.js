import React, {useState,useEffect} from 'react';
import { Header, Icon, Input, Button, ListItem } from '@rneui/themed';
import { FlatList, Text, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import SelectDropdown from 'react-native-select-dropdown'

export default function WorkoutList({ navigation, workouts, loggedUser }){

    const [selected, setSelected] = useState(false)
    const [chartFilter, setChartFilter] = useState(0)
    const [perMonth, setPerMonth]= useState([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]])

    const chartFilterOptions = ["Reps", "Volume"]

    useEffect(() => {
        copy = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        for(let i = 0; i < workouts.length; i++){
            const month = workouts[i].date.split("-")[1]-1
            if (loggedUser.uid === workouts[i].userId){
                for(let j = 0; j < workouts[i].workout.length; j++){
                    for(let k = 0; k < workouts[i].workout[j].length; k++){
                        for(let y = 0; y < workouts[i].workout[j][k].sets.length; y++){
                            copy[month][0] += Number(workouts[i].workout[j][k].sets[y].amount)
                            copy[month][1] += Number(workouts[i].workout[j][k].sets[y].resistance)
                        }
                    } 
                }
            }
            setPerMonth(copy)
        }
    }, [workouts])

    const handleFilterChange = (index) => {
        setChartFilter(index)
    }

    return(
        <FlatList
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) =>
            <>
                {
                selected ? 
                <>
                <Button icon={{name: 'clear'}} onPress={() => setSelected(false)} title="Back" color={'gray'} />
                <FlatList 
                keyExtractor={(item, i) => i}
                renderItem={({item}) =>
                    <>
                        <Text>{item.name}</Text>
                        <Text>{item.type}</Text>
                        <FlatList 
                        keyExtractor={(item, i) => i}
                        renderItem={({item}) =>
                            <>
                            <Text>reps resistance</Text>
                            <Text>{item.amount} {item.resistance}</Text>
                            </>
                        }
                        data={item.sets}
                        />
                        <Text></Text>
                    </>
                }
                data={selected}
                />
                </>
                :
                <>
                <SelectDropdown
                data={chartFilterOptions}
                onSelect={(selectedItem, index) => {
                    handleFilterChange(index)
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem + " per month"
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
                defaultButtonText="Reps per month"
                />
                <LineChart data={{
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                datasets: [
                    {
                    data: [
                        perMonth[0][chartFilter],
                        perMonth[1][chartFilter],
                        perMonth[2][chartFilter],
                        perMonth[3][chartFilter],
                        perMonth[4][chartFilter],
                        perMonth[5][chartFilter],
                        perMonth[6][chartFilter],
                        perMonth[7][chartFilter],
                        perMonth[8][chartFilter],
                        perMonth[9][chartFilter],
                        perMonth[10][chartFilter],
                        perMonth[11][chartFilter]
                    ]
                    }
                ]
                }} 
                width={Dimensions.get("window").width}
                height={220}
                yAxisLabel={""}
                yAxisInterval={1}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
                />
                <Button onPress={() => setSelected(item.workout[index])} title={"workout " + workouts[index].date} color={'gray'} />
                </>
                }
            </>
        }
        data={workouts}
        />
    )
}