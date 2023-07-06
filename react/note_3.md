# 서버
- 유저 요청 시 데이터를 보내주는 간단한 프로그램
- 서버에 데이터를 요청할 때는 정확한 규격에 맞춰서 요청
    1. 어떤 데이터인지 (URL 형식으로)
    2. 어떤 방법으로 요청할지 (GET or POST)
- GET요청 : 브라우저 주소창 등/ POST요청 : form 태그 이용 (모두 브라우저가 새로고침된다)

# AJAX란? 
서버에 GET, POST 요청을 할 때 새로고침 없이 데이터를 주고받을 수 있게 도와주는 간단한 브라우저 기능
## 사용방법 (택1)
1. XMLHttpRequest라는 옛날 문법 쓰기
2. fetch() 라는 최신 문법 쓰기
3. axios 같은 외부 라이브러리 쓰기 

# axios로 AJAX 사용하기
## 설치
```
npm install axios 
```
## 사용
1. 상단에서 import해오고
2. axios.get(URL)을 하면 그 URL로 GET요청
3. 데이터 가져온 결과는 결과.data 안으로..
4. 실패했을 때 실행할 코드는 .catch()
```javascript
import axios from 'axios'

function App(){

  let [shoes, setShoes] = useState(어쩌구);
  return (
    <button onClick={()=>{
      axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
        let copy = [...shoes, ...결과.data] // 기존 + 추가본 
        setShoes(copy)
      })
      .catch(()=>{
        console.log('실패함')
      })
    }}>버튼</button>
  )
}
```
### POST요청
```javascript
axios.post('URL', {name : 'kim'})
```
### 요청 여러개 날리기
```javascript
Promise.all( [axios.get('URL1'), axios.get('URL2')] )
```

## 서버와는 문자자료만 주고받기 가능
- axios 라이브러리는 JSON -> object/array 변환작업을 자동으로 해줌
- 자바스크립트로는?
```javascript
fetch('URL').then(결과 => 결과.json()).then((결과) => { console.log(결과) } )
```

# Context API
- props를 이중으로 전송하기 싫을 때? 
- (예) App -> Detail -> TabContent (조부모->부모 ->자식)
  1. Context API 문법을 쓰거나 
      - context는 일종의 state 보관함
  2. Redux 같은 외부 라이브러리 사용
## 장단점
- Context는 중첩해서 사용한 컴포넌트가 많을 때 편리한 문법
1. state 변경시 쓸데없는 컴포넌트까지 전부 재렌더링이 되고 
2. 재사용할 때 Context를 import 하는게 귀찮아질 수 있다
    - 그래서 Context보다 redux 같은 외부라이브러리를 많이 사용한다.


## 사용 준비
1. createContext() 함수를 가져와서 context를 만든다
2. Context1로 원하는 컴포넌트를 감싸고 
3. value 속성 안에 공유를 원하는 state를 다 적기
```javascript
(App.js)
export let Context1 = React.createContext();

function App(){
  let [재고, 재고변경] = useState([10,11,12]);  //상품0,1,2의 재고

  return (
    <Context1.Provider value={ {재고, shoes} }>
      <Detail shoes={shoes}/>
    </Context1.Provider>
  )
}
```
## 사용
1. Context1을 import 하고 
2. useContext() 안에 담기 (Context 해체해주는 함수)
3. 해당 자리에 공유했던 모든 state가 남는다
```javascript
(Detail.js)
import {useState, useEffect, useContext} from 'react';
import {Context1} from './../App.js';

function Detail(){
  let {재고} = useContext(Context1) //재고 state 사용시
  return (<div>{재고}</div>) //props 안써도 state가 잘 나온다!
}
```
## Redux
- props 없이 state를 공유할 수 있게 도와주는 라이브러리
- js 파일 하나에 state들을 보관 가능
- 귀찮은 props 전송이 필요없다
- 컴포넌트가 많을 때 사용하는 것이 좋다 (버그확인이 쉬워짐)
    - state 하나가 오류나는 경우 관련 컴포넌트를 모두 뒤져봐야 하기 때문에...
### 설치
- 문법이 조금 더 쉬워진 redux toolkit 사용 (redux의 개선버전)
```javascript
npm install @reduxjs/toolkit react-redux
```
- (package.json) "react", "react-dom" 모두 18.1.x 이상이여야 함

### 셋팅
1. state 보관 파일 생성 (store.js)
```javascript
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: { }
}) 
```
2. Provider 컴포넌트와 아까 작성한 파일을 import (index.js)
3. 하단에 Provider로 App을 감싸기
```javascript
(index.js)
import { Provider } from "react-redux";
import store from './store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
); 
```
- 이제 App과 App의 자식컴포넌트들은 store.js에 있던 state를 꺼내쓸 수 있다

### state 보관
1. 상단에서 import (store.js)
2. createSlice( ) 로 state 만들고 
3. configureStore( ) 안에 state 등록
    - 여기 등록한 state는 모든 컴포넌트가 자유롭게 사용가능
```javascript
import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'kim'
})

export default configureStore({
  reducer: {user : user.reducer}
}) 
```
### state 사용
```javascript
(Cart.js)
import { useSelector } from "react-redux"

function Cart(){
  let a = useSelector((state) => { return state } )
  //또는
  //let a = useSelector((state) => state.user ) 
  console.log(a)

  return (생략)
}
```
### state 수정
1. slice 내부에 reducers : { 함수작성 } 
  - 파라미터 하나 작명하면 그건 기존 state가 된다.
  - return 우측에 새로운 state 입력하면 그걸로 기존 state를 변경한다.
```javascript
(store.js)
let user = createSlice({
  name : 'user',
  initialState : 'kim',
  reducers : {
    changeName(state){
      return 'john ' + state
    }
  }
}) 
// changeName() 쓸 때 마다 'kim' -> 'john kim'으로 변경됨
```

2. export 한다
```javascript
import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : 'kim',
  reducers : {// reducers : state 수정함수
    changeName(state){
      return 'john ' + state
    },
  }
})
export let {changeName} = user.actions  //오른쪽 자료를 변수로 빼서 export
```

3. state 변경함수를 import 후 dispatch() 로 감싸서 사용
```javascript
(Cart.js)
import { useDispatch, useSelector } from "react-redux"
import { changeName } from "./../routes/store.js"

let dispatch = useDispatch()

//(생략)
<button onClick={()=>{  dispatch(changeName()) }}>버튼</button>
// 버튼 클릭시 (store.js)에 changeName 함수 실행요청을 한다.
```

### state 수정 (array/object)
```javascript
 // 'kim' -> 'park'
let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20},
  reducers : {
    changeName(state){
      state.name = 'park' // state를 직접 수정해버려도 잘 된다
      //return {name : 'park', age : 20}
    },increase(state, a){ // 파라미터문법 사용가능
      state.age += a.payload // payload= 화물, 소포란 뜻..
    }
  }
}) 
```
#### 예) 수량 +1 기능
```javascript
<button onClick={()=>{ dispatch(addCount(state.cart[i].id)) }}>+</button>
// 버튼클릭시 해당 상품 id를 payload로 전송
```
```javascript
let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    addCount(state, action){
      let 번호 = state.findIndex((a)=>{ return a.id === action.payload }) 
      //findIndex()로 array 중 payload와 같은 id를 가진 상품을 찾아서
      state[번호].count++
    },
    addItem(state, action){ 
      state.push(action.payload) // 파라미터값을 state에 추가
    }
  }
}) 
```
```javascript
(Detail.js)
<button className="btn btn-danger" onClick={()=>{ 
  dispatch(addItem( {id : 찾은상품.id, name : 찾은상품.title, count : 1} )) 
}}>주문하기</button>
```