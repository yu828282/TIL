import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './color';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';

export default function App() {

  const STORAGE_KEY = "@toDos";

  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const [updateText, setUpdateText] = useState('');

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload); // text를 받아서 state에 담는다
  const addToDo = async() => { // await saveToDos(newToDos)를 했으니 async 해줘야 한다
    // alert(text);
    if (text === "") {return;}
    //save to do
    // const newToDos = Object.assign(
    //   {}, 
    //   toDos, { // 빈 object와 toDos에 새 todo 합치기
    //  [Date.now()]: { text, work: working },
    //  });
     const newToDos = { 
      ...toDos,  // toDos내용을 가진 새 object 생성, '...'을 이용하면 객체의 '내용'만 가져올 수 있다
      [Date.now()]: { text, working }, 
      }; 
     setToDos(newToDos);
     await saveToDos(newToDos);
     setText("");
     console.log(toDos)
  };
  
  const saveToDos = async (toSave) => { //toSave에서 toDos를 받아옴 //await 해줬으니 async 줘야 함
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave)); // object -> string
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(s); 
    //s !== null ? setToDos(JSON.parse(s)) : null;
    if(s){
      setToDos(JSON.parse(s))// parse : string -> 자바스크립트 object  
    }
  };
  useEffect(() => {
    loadToDos();
  }, []);

  const deleteToDo = (key) => {
    Alert.alert("To Do 삭제", "해당 할일이 삭제됩니다", [
      { text: "취소" },
      {
        text: "삭제",
        //style: "destructive",  ios만 가능하다..
        onPress: () => {
          const newToDos = { ...toDos }; // 기존 toDos 내용으로 새 object를 만들었다
          delete newToDos[key]; // 해당 toDos의 key(id)를 삭제한다
          setToDos(newToDos); // state 업데이트
          saveToDos(newToDos); // AsyncStorage에 저장
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}> 
        <TouchableOpacity activeOpacity={0.5} onPress={work}> 
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey }} >Work</Text>
        </TouchableOpacity>
        <TouchableHighlight 
          //투명도 underlayColor="#DDDDDD"
          activeOpacity={0.6}
          onPress={travel}
          // onPress={() => console.log('pressed')}
        >
          <Text style={{ ...styles.btnText, color: !working ? "white" : theme.grey, }} >Travel</Text>
        </TouchableHighlight>
      </View>
      <View>
        <TextInput 
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          style={styles.input} 
          value={text}
          returnKeyLabel = "done"
          placeholder={working ? "할일을 추가해보세요..." : "어디로 갈 예정인가요?"}
        >
        </TextInput>
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteToDo(key)}/*key= id */>
                  <Text><Fontisto name="trash" size={16} color={theme.gray} /></Text>
                </TouchableOpacity>
              </View>
            ) : null
          )}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal : 20,
  },
  header : {
    justifyContent : 'space-between',
    flexDirection : 'row',
    marginTop: 100,
  },
  btnText : {
    fontSize : 44,
    fontWeight: 600,
    color : '#fff',
  },
  input : {
    backgroundColor : 'white',
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius : 20,
    fontSize : 18,
  },
  toDo : {
    backgroundColor : theme.grey,
    marginBottom : 10,
    paddingVertical : 20,
    paddingHorizontal : 20,
    borderRadius : 15,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  toDoText : {
    color : 'white',
    fontSize : 16,
    fontWeight : 500,
  },
});
