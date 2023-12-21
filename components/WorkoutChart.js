import React,{useEffect, useState} from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import SelectDropdown from 'react-native-select-dropdown'

export default function WorkoutChart({workouts, navigation, loggedUser}){
   
    function Last7Days (dropYear) {
        return '0123456'.split('').map(function(n) {
            var d = new Date();
            d.setDate(d.getDate() - n);
    
            return (function(day, month, year) {
                month += 1;
                return [day<10 ? '0'+day : day, month<10 ? '0'+month : month, dropYear ? '' : year].join('-');
            })(d.getDate(), d.getMonth(), d.getFullYear());
        });
     }

    const chartFilterOptions = ["Reps", "Volume"]
    const chartDateFilterOptions = ["Year", "Week"]

    const [chartFilter, setChartFilter] = useState(0)
    const [chartTimeFilter, setChartTimeFilter] = useState(0)
    const [perMonth, setPerMonth]= useState([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]])
    const [perLastWeek, setPerLAstWeek] = useState([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]])

    const chartDataOptions = [[
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
        ],[
            perLastWeek[0][chartFilter],
            perLastWeek[1][chartFilter],
            perLastWeek[2][chartFilter],
            perLastWeek[3][chartFilter],
            perLastWeek[4][chartFilter],
            perLastWeek[5][chartFilter],
            perLastWeek[6][chartFilter]
    ]]
    
    const chartLabelOptions = [[
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
        ],Last7Days(true)]

    useEffect(() => {
        copyMonth = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        copyWeek = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        for(let i = 0; i < workouts.length; i++){
            const month = workouts[i].date.split("-")[1]-1
            const lastWeek = Last7Days().reverse()
            const indexOfDay = lastWeek.indexOf(workouts[i].date)
            if (loggedUser.uid === workouts[i].userId){
                for(let j = 0; j < workouts[i].workout.length; j++){
                    for(let k = 0; k < workouts[i].workout[j].length; k++){
                        for(let y = 0; y < workouts[i].workout[j][k].sets.length; y++){
                            copyMonth[month][0] += Number(workouts[i].workout[j][k].sets[y].amount)
                            copyMonth[month][1] += (Number(workouts[i].workout[j][k].sets[y].resistance) * Number(workouts[i].workout[j][k].sets[y].amount))
                            if(indexOfDay >= 0){
                                copyWeek[indexOfDay][0] += Number(workouts[i].workout[j][k].sets[y].amount)
                                copyWeek[indexOfDay][1] += (Number(workouts[i].workout[j][k].sets[y].resistance) * Number(workouts[i].workout[j][k].sets[y].amount))
                            }
                        }
                    } 
                }
            }
            setPerLAstWeek(copyWeek)
            setPerMonth(copyMonth)
        }
    }, [workouts])
    
    const handleFilterChange = (index) => {
        setChartFilter(index)
    }

    return(
        <>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text>Reps or volume?:   </Text>
            <SelectDropdown
            data={chartFilterOptions}
            onSelect={(selectedItem, index) => {
                handleFilterChange(index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
            defaultButtonText="Reps"
            />
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text>Select  time frame:</Text>
            <SelectDropdown
            data={chartDateFilterOptions}
            onSelect={(selectedItem, index) => {
                setChartTimeFilter(index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                return item
            }}
            defaultButtonText="Year"
            />
        </View>
        <LineChart data={{
        labels: chartLabelOptions[chartTimeFilter],
        datasets: [
            {
            data:chartDataOptions[chartTimeFilter] 
            }
        ]
        }} 
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel={""}
        yAxisInterval={1}
        chartConfig={{
            backgroundColor: "#17c1e8",
            backgroundGradientFrom: "#17c1e8",
            backgroundGradientTo: "#17c1e8",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
            borderRadius: 16
            },
            propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#3B5998"
            }
        }}
        bezier
        style={{
            marginVertical: 8,
            borderRadius: 16
        }}
        />
        </>
    )
}