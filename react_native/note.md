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