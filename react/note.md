# react
## 사용이유
1.  Single Page Application를 쉽게 만들 수 있다.
    - html 파일을 1개만 쓰고 
    - 다른 페이지를 보여주고 싶을 때 html 부분만 갈아치워서 보여주는 사이트
2. html을 함수, array, object 이런 곳에 보관하고 재사용할 수 있어서 html 관리 편리해짐
3. React Native를 쓰면 같은 리액트 문법으로 모바일 앱개발도 가능
## 사용방법
```
npx create-react-app blog  
cd blog
npm start
```

### JSX 문법 
1. html에 class 넣을 땐 className
2. 변수를 html에 꽂아넣을 때는 {중괄호}
3. html에 style속성 넣고싶으면 style={ }
```html
<div style={ {color : 'blue', fontSize : '30px'} }> 글씨 </div>
```

### state 사용법
- 리엑트는 변수가 아닌 state에 데이터 저장 가능
- return( ) 으로 반환
- return( ) 내부는 하나의 태그로 시작해서 하나의 태그로 끝나야 함
```javascript
import { useState } from 'react';

function App(){
  let [a,b] = useState('추천');
  return (
      { a }
  )
}
```
- state에 변동이 생기면 state가 포함된 html을 자동 랜더링 -> 자주 변경될 데이터는 state에 저장하는 것이 좋다.

### onClick 사용법 (JSX)
1. Click이 대문자
2. { } 중괄호 사용
3. 중괄호 안에 함수를 넣어야 잘 동작
```html
<div onClick={실행할함수}>
//또는
<div onClick={ function(){ 실행할코드 }}> 
<div onClick={ () => { 실행할코드 } }>
```
### state 변경
- state는 state변경함수를 써서 state를 변경해야함 (안쓰면 html 재랜더링 안됨)
- 수정시에는 독립적인 카피본을 만들어서 수정하는 것이 좋다
- state 변경함수는 약간 늦게 처리된다(비동기적으로)
```javascript
let [ 초기값, 변경값 ] = useState(0); 

변경값(새로운state) 
```

```javascript
function App(){  
  let [ a, b ] = useState(0);
  return (
      <span onClick={ ()=>{ b(a + 1) } } >👍</span> { a }
  )
}
```

### state 변경함수 동작원리 
1. 기존state === 신규state 검사
2. 일치하면 state 변경 안됨
3. 자료 복사 시 화살표만 복사되므로 값이 달라져도 일치하는 것으로 본다
4. [...변경값]으로 사용시 화살표를 달라지게 해야함(괄호 벗기기용 연산자/ 깊은복사)
* array 형태의 state 조작은 일단 copy부터 할 것

```javascript
function App(){
  
  let [제목, 제목변경] = useState( ['코트 추천', '맛집'] );  
  
  return (
    <button onClick={ ()=>{ 
      let copy = [...제목];
      copy[0] = '여자코트 추천';
      copy.sort();
      제목변경(copy)
    } }> 수정버튼 </button>
  )
}
```

## Component 문법
-  긴 HTML을 한 단어로 깔끔하게 치환해서 넣을 수 있는 문법
- 축약한 HTML 덩어리
- 자주 출현하고 변경되는 html을 component화 하면 좋다
- function 을 이용해 생성
1. component는 보통 영어대문자로 작명
2. return () 안엔 html 태그들이 평행하게 여러개 들어갈 수 없다.
3. function App(){} 내부에서 만들면 안됨(component 안에 component를 만들지 않기)
```javascript
function App (){
  return (
    <div>
      <Modal></Modal>
    </div>
  )
}

function Modal(){
  return (
    <div className="modal">
      <h4>제목</h4>
    </div>
  )
}
```
## JSX에서 조건문 쓰는 법
- 삼항연산자 사용

```javascript
조건식 ? 조건식 참일 때 실행할 코드 : 조건식 거짓일 때 실행할 코드 
```

## map 함수
1. array 안의 자료 개수만큼 코드 반복실행 (for 반복문 대신 사용가능)
2. 콜백함수에 파라미터가 있는 경우 array안 자료가 하나씩 출력됨
3. return 오른쪽의 자료를 array에 담아준다
```javascript
var 어레이 = [2,3,4];
var newArray = 어레이.map(function(a){
  return a * 10
});
console.log(newArray) //  [20, 30, 40] 이 출력
```
- map 반복문으로 반복생성한 html엔 key={i} 속성을 추가해야함
- 그래야 react가 div 구별 가능
```html
<div className="list" key={i}> 
```

## props
- 부모 컴포넌트의 state를 자식 state로 전달
  - 다양한 컴포넌트에서 쓰이는 state는 최고 부모 컴포넌트에 만들어두기! (APP 컴포넌트)
  - 자식 컴포넌트의 state를 부모 컴포넌트로 전달하거나, 다른 자식 컴포넌트로 전달하는 건 불가능하다
- state 외에도 일반 변수, 함수 전송도 가능
- 일반 문자는 중괄호 없이 전송

1. 자식컴포넌트 사용하는 곳에 가서 <자식컴포넌트 작명={state이름} /> 
2. 자식컴포넌트 만드는 곳에 가서 props라는 파라미터 등록 후 props.작명 사용
```javascript
//부모 컴포넌트 
return (
    <div>
      <Modal 글제목={글제목}></Modal>
    </div>
  )
//자식 컴포넌트
function Modal(props){
  return (
    <div className="modal">
      <h4>{ props.글제목[0] }</h4>
    </div>
  )
}

```
## 기타
- 페이지 로드 빠르게 하기 : 컴포넌트들을 lazy하게 로딩
https://legacy.reactjs.org/docs/code-splitting.html#route-based-code-splitting
