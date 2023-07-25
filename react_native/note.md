# React Native
- 리엑트 네이티브 : 일종의 번역기.
- 코드를 ios 또는 자바 안드로이드용 코드로 번역해준다.

## 설치 및 세팅
```
npm install --global expo-cli
```
- Expo 어플리케이션 설치

```
(날씨 어플 만들기)
npx create-expo-app weather
npx expo login
npx expo start

```
- snack (온라인 코드에디터) 이용
https://snack.expo.dev

## 코드
- View : div 사용 불가
- Text : 모든 텍스트는 이 코드에 정의
- 일부 스타일 사용 불가 (border..)
    - 하단에 정의(StyleSheet 사용시 자동완성)
    - 코드 내부에 인라인 작성
```javascript
<View style={styles.container}>

<Text style={{fontSize : 28}}>hello world</Text>

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
```
- StatusBar component : 시계, 배터리, 와이파이

## 컴포넌트
- 화면에 렌더링할 항목, 함수의 return 키워드 안에 있다
- View, Text, StatusBar 등...

## API
- 단지 자바스크립트 코드
- Vabration 등...

## React Native Directory
- React-Native 패키지가 지원하지 않는 컴포넌트는 커뮤니티(서드파티)가 관리
- https://reactnative.directory/

### Expo SDK
- Expo 팀이 자체적으로 중요한 컴포넌트 및 API 제공
- https://docs.expo.dev/versions/latest/

## 레이아웃 시스템
- Flexbox 사용합
- 웹에서와 거의 같은 방식
- 99.8% 의 경우 높이와 너비에 기반해서 레이아웃을 만들지 않는다.
- flexDirection 기본값은 column
- 너비, 높이 비율로 표현 (flex -> 부모/자식에 부여)
```javascript
export default function App() {
  return (
    <View style={{flex : 1}}>
      <View style={{flex : 1, backgroundColor:'tomato'}} ></View>
      <View style={{flex : 1, backgroundColor:'teal'}} ></View>
      <View style={{flex : 1, backgroundColor:'orange'}} ></View>
    </View>
  );
}
```
- ScrollView 
  - style prop 적용되지 않아 content Style을 사용해야한다
  - 스크롤이 overflew 되어야 하니까 flex 사이즈를 주어서도 안된다
  - pagingEnabled
    - 일정 경계 이상 스크롤이 되면 스크롤을 방지하는 props
  - indicatorStyle 
    - UI 하단 스크롤 스타일 props
```javascript
<ScrollView horizontal contentContainerStyle={styles.weather}>
```
- Dimensions 
  - 핸드폰 사이즈를 알려주는 API
  ```javascript
  const {width : SCREEN_WIDTH} = Dimensions.get('window');
  // 또는
  const SCREEN_WIDTH = Dimensions.get('window').width;
  ```
  - 위치정보 가져오기 
  ```javascript
  npx expo install expo-location
  ```

# ToDo App
https://dribbble.com/shots/5985329-Do-More-Task-List
```javascript
npx create-expo-app --template
//(blank) 선택
//What is your app named? ... WorkHardTravelHardApp
cd .\WorkHardTravelHardApp\
npx expo login
npx expo start
```

## Touchable
- 누르는 이벤트를 listen 할 수 있는 view
  - onPressIn : 손가락이 영역에 들어갔을 떄
  - onPressOut : 손가락이 그 영역에서 벗어났을 때
  - onPress = onPressIn + onPressOut : 손가락을 누르고 뗀 순간
- https://reactnative.dev/docs/touchablehighlight
### TouchableOpacity
- 눌렀을 때 투명도 설정가능
### TouchableHighlight 
- 눌렀을 때 배경색 설정 가능
### TouchableWithoutFeedback
- 눌렀을 때 UI 변경 없음
## Pressable
- Touchable API 보다 더 다양한 설정 가능
### hitSlop
- 요소 바깥을 눌렀을 때에도 인식 할 수 있도록 설정 

```javascript
<TouchableHighlight onPress={() => console.log("pressed")}>
  <Text style={styles.btnText}>Travel</Text>
</TouchableHighlight>
```

## TextInput
https://reactnative.dev/docs/textinput
- onFocus : 입력받을 수 있는 상태
- keyboardType : 키보드의 입력 타입 변경 
```javascript
<TextInput
  keyboardType="number-pad" // email-address, url....등등
  placeholder={working ? "Add a To DO!" : "Where do you want to go?"}
  style={styles.input}
></TextInput>
```
- onChangeText : 입력한 텍스트값 받기
- returnKeyType : return 버튼 변경가능
- returnKeyLable : return 버튼 레이블로 설정 가능 (버튼에 쓸 text를 마음대로 정할 수 있음)
- secureTextEntry : 입력값이 보이지 않음
- multiline : 여러 줄 쓸 수 있게 입력창 변경
- autoCapitalize: 입력값에 대문자 지정
- onSubmitEditing : 제출시 발생하는 이벤트(함수)

### Payload
- 특정 값을 액션객체에 담아 보내주는 것
```javascript
const [text, setText] = useState("");
const onChangeText = (payload) => setText(payload);
const addToDo = () => {alert(text);}

return (
  //(생략)
  <TextInput 
    onChangeText={onChangeText}
    value={text}
  >
  </TextInput>
)
  //(생략)
```
## object assign
- object를 다른 object와 합쳐 새로운 object를 리턴
```javascript
Object.assign({}, toDos, {[Date.now()]:{Work:true}})
//toDos 가 새로운 object와 합쳐졌다.
//{work:false}
//{work:true}
//(...)
```
## es6 사용(object assign이 이해가 되지 않는다면...)
```javascript
const newToDos = { 
  ...toDos,  // toDos내용을 가진 새 object 생성,
  [Date.now()]: { text, work: working }, 
  }; 
```
### Object로 map 쓰는 법 
- Object.keys(object 이름) : key값들만 모아서 array로 반환
- Object.keys(object 이름).map()으로 사용

## ...(spread operator, rest operator)
- 자바스크립트 문법
- spread operator : object, array 내부 값을 전개한다 
```javascript
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [ ...numbers1, 1, 2, 6, 7, 8]; 
// 결과 [1, 2, 3, 4, 5, 1, 2, 6, 7, 8]
```
- rest operator : 함수의 파라미터들(arguments)을 array 형태로 전달
```javascript
function sum(...numbers) {
	return numbers.reduce((accumulator, current) => {
		return accumulator += current;
	});
};
 
sum(1,2) // 3
sum(1,2,3,4,5) // 15
```

- 삭제 함수에 사용
```javascript
(바른 복사방식)
const newToDos = {...toDos} // 새 객체에 기존 객체 내용 복사

(잘못된 복사방식)
const newToDos = todo //참조값을 복사하므로 이후 내용을 변경해도 state 변경이 되지 않는다 = rerender 안된다

```

## AsyncStorage
- https://docs.expo.dev/versions/latest/sdk/async-storage/
- 브라우저의 local storage 처럼 작동한다
- string 형태만 저장가능

### 설치
```javascript
npx expo install @react-native-async-storage/async-storage
```
- expo install은 기본적으로 npm install을 실행시킨다
- expo install은 사용중인 expo 버전과 같은 버전 모듈을 설치

### 사용
- await AsyncStorage.setItem 작성
- @key와 value(string 타입) 작성
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToDos = async (toSave) => {
    await AsyncStorage.setItem("@toDos", JSON.stringify(toSave));
  };
```

#### async & await
- 자바스크립트의 비동기 처리 패턴
- async : 함수 앞에 붙이는 예약어 
```javascript
async function 함수명() {
  await 비동기_처리_메서드_명(); // 비동기_처리_메서드는 반드시 프로미스 객체를 반환
}
```

## Alert API
- alert() : 제목, 메시지, 버튼 
- https://reactnative.dev/docs/alert
- prompt() : ios에서만 작동.

## icon 첨부
- https://icons.expo.fyi/Index