import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { Fontisto } from "@expo/vector-icons";


const {width : SCREEN_WIDTH} = Dimensions.get('window');
// console.log(SCREEN_WIDTH)

const API_KEY = '93aa72cb22f3bcd12ec184a0fc75b497'

const icons = { Clouds: "cloudy", Clear: "day-sunny", Atmosphere: "cloudy-gusts", Snow: "snow", Rain: "rains", Drizzle: "rain", Thunderstorm: "lightning", /* 날씨 : 아이콘명*/};

export default function App() {
  const [city, setCity] = useState('로딩중...');
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  const getWeather = async() =>{
    // const permission =  await Location.requestForegroundPermissionsAsync();
    // console.log(permission);
    const {granted} =  await Location.requestForegroundPermissionsAsync();
    if (!granted){
      setOk(false);
    }
    // const location = await Location.getCurrentPositionAsync({accurency:5});
    // console.log(location);
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accurency:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false})
    
    setCity(location[0].region)

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    const json = await response.json();
    // console.log(json.list[0].dt_txt.substr(0, 10)) //2023-07-16
    // console.log(json.list[0].weather[0].main) // Clouds
    const filteredList = json.list.filter(({ dt_txt }) => dt_txt.endsWith("00:00:00"));
    setDays(filteredList);
  };

  useEffect(() => {
    getWeather()
  }, []);

  return (
    <View style={styles.container}>
    <StatusBar style='dark'></StatusBar>
      <View style={styles.city}>
        <Text style={styles.cityName}>{ city }</Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
      {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View>
                <Text style={styles.today}>{day.dt_txt.substr(0, 10)}</Text>
                <Text style={styles.temp}> 
                  {parseFloat(day.main.temp).toFixed(1)}°
                </Text>
                <Fontisto name= {icons[day.weather[0].main]}size={68}color="white"/>
              </View>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
        {/* <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
  city : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName : { 
    fontSize : 38,
    fontWeight: "400",
  },
  weather : {
    // flex: 3, //스크롤이 overflew 되어야 하니까
  },  
  day : {
    flex: 1,
    alignItems: 'center',
    width : SCREEN_WIDTH,
  },  
  today : {
    fontSize : 38,
  },
  temp : {
    marginTop : 50,
    fontSize : 128,
  },
  description : {
    marginTop : -30,
    fontSize : 60,
  },
});
