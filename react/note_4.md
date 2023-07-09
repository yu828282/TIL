## if 문

1. 컴포넌트 안에서 쓰는 if/else
```javascript
function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } else {
    return null;
  }
} 
```
```javascript
function Component() {
  if ( true ) {
    return <p>참이면 보여줄 HTML</p>;
  } //else 생략 가능
  return null;
} 
```
2. JSX안에서 쓰는 삼항연산자 
- 중첩 사용도 가능하나 알아보기 어렵다
```javascript
function Component() {
  return (
    <div>
      {
        1 === 1
        ? <p>참이면 보여줄 HTML</p>
        : null
      }
    </div>
  )
} 
```
3. && (AND)연산자로 if 역할 대신하기
- && 중 false 값을 찾고 아니라면 마지막 값 출력
```javascript
true && false; // false
true && true;  // true
true && '안녕';  //안녕
false && '안녕'; // false
true && false && '안녕'; // false
```
```javascript
// 위의 예제와 동일하다
function Component() {
  return (
    <div>{ 1 === 1 && <p>참이면 보여줄 HTML</p> }</div>
  )
}
```
4. switch / case 조건문
```javascript
function Component2(){
  var user = 'seller';

  if (user === 'seller'){
    return <h4>판매자 로그인</h4>
  } else if (user === 'customer'){
    return <h4>구매자 로그인</h4>
  } else {
    return <h4>그냥 로그인</h4>
  }
}
// 위와 동일
function Component2(){
  var user = 'seller';

  switch (user){
    case 'seller' :
      return <h4>판매자 로그인</h4>
    case 'customer' :
      return <h4>구매자 로그인</h4>
    default : 
      return <h4>그냥 로그인</h4>
  }
}
```
5. object/array 자료형 응용 
```javascript
function Component() {
  var 현재상태 = 'info';
  return (
    <div>
      {
        { 
           info : <p>상품정보</p>,
           shipping : <p>배송관련</p>,
           refund : <p>환불약관</p>
        }[현재상태]
      }
    </div>
  )
} // state 가 info 면 상품정보가, refund면 환불약관 표시..
```
```javascript
var 탭UI = { 
  info : <p>상품정보</p>,
  shipping : <p>배송관련</p>,
  refund : <p>환불약관</p>
}
function Component() {
  var 현재상태 = 'info';
  return (
    <div>{탭UI[현재상태]}</div>
  )
} 
```
## localStorage
### 문법
```javascript
localStorage.setItem('데이터이름', '데이터'); //추가
localStorage.getItem('데이터이름'); //읽기
localStorage.removeItem('데이터이름') //삭제
```
### array/object 자료 저장
- 원래 문자만 저장 가능하나 JSON으로 변환하면 저장 가능
```javascript
localStorage.setItem('obj', JSON.stringify({name:'kim'}) );
```
```javascript
var a = localStorage.getItem('obj'); //데이터 읽기
var b = JSON.parse(a) //JSON -> array/object 변환
```

### 최근 본 상품 기능
1. 누가 Detail페이지 접속하면 
2. 현재 페이지에 보이는 상품id 가져와서
```javascript
(Detail.js)

useEffect(()=>{console.log(찾은상품.id)}, [])
```
3. localStorage에 watch항목에 있던 [ ]에 추가
```javascript
(Detail.js)

useEffect(()=>{
  let 꺼낸거 = localStorage.getItem('watched')
  꺼낸거 = JSON.parse(꺼낸거)
  꺼낸거.push(찾은상품.id)
  localStorage.setItem('watched', JSON.stringify(꺼낸거))
}, [])
```
4. 이미 상품 id가 있다면 추가하지 않는다 (set 이용)
```javascript
(Detail.js)

useEffect(()=>{
  let 꺼낸거 = localStorage.getItem('watched')
  꺼낸거 = JSON.parse(꺼낸거)
  꺼낸거.push(찾은상품.id)

  꺼낸거 = new Set(꺼낸거) //set 으로 바꾸고
  꺼낸거 = Array.from(꺼낸거) // 다시 array형으로...
  localStorage.setItem('watched', JSON.stringify(꺼낸거))
}, [])
```

## react-query (실시간 데이터 가져오기)
- 몇초마다 자동으로 데이터 다시 가져오게 하려면?
- 요청실패시 몇초 간격으로 재시도?
- 다음 페이지 미리가져오기?
- ajax 성공/실패시 각각 다른 html을 보여주려면?
- 장점
    1. ajax 요청 성공/실패/로딩중 상태를 쉽게 파악
    2. 알아서 ajax 재요청
       - 오히려 비효율적일수도 있어 웹소켓이나 Server-sent events 같은 가벼운 방식을 사용할 수도 있다
    3. 실패시 알아서 재시도
    4. ajax로 가져온 결과는 state 공유 필요없음 
       - 컴포넌트에다가 유저이름 ajax 요청 (캐싱기능이 있어 기존 건을 우선 사용한다)

### 설치
```javascript
npm install @tanstack/react-query 
```
### 셋팅
```javascript
(index.js)
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query' //1번

const queryClient = new QueryClient()   //2번
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(//3번
  <QueryClientProvider client={queryClient}>  
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
); 
```
### react-query로 ajax 요청하는 법
```javascript
function App(){
  let result = useQuery(['작명'], ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
  )
  // return(상태파악)은 선택사항
    // return (                
    // <div>
    //     { result.isLoading && '로딩중' }
    //     { result.error && '에러남' }
    //     { result.data && result.data.name }
    // </div>
    // )
}
```
# 그 외
## React Developer Tools (크롬 확장프로그램)
- 개발중인 리액트사이트를 컴포넌트로 미리 확인 가능
- Profiler 탭에서 녹화시 렌더링된 모든 컴포넌트의 렌더링시간 표시됨

## Redux Developer Tools  (크롬 확장프로그램)
- dispatch 날릴 때 마다 뭐가 어떻게 바뀌었는지 로그 작성

## lazy import
1. 리엑트 코드 완성 후 npm run build로 html css js 파일로 변환
2. html, js 파일이 하나만 생성되어 사이즈가 크다
3. 첫페이지 로딩속도가 느릴 때 js 파일을 잘게 쪼개면 좋다

```javascript
(App.js)
import Detail from './routes/Detail.js'
import Cart from './routes/Cart.js'
//위 내용을 아래 내용으로 수정
import {lazy, Suspense, useEffect, useState} from 'react'

const Detail = lazy( () => import('./routes/Detail.js') )
const Cart = lazy( () => import('./routes/Cart.js') )
// 첫 페이지 로딩속도가 빨라진다
```
- lazy 사용하면 Detail 컴포넌트 로드까지 지연시간이 발생할 수 있다
1. Suspense import
2. Detail 컴포넌트를 감싸면
3. Detail 컴포넌트가 로딩중일 때 대신 보여줄 html 작성도 가능
```html
<Suspense fallback={ <div>로딩중임</div> }>
  <Detail shoes={shoes} />
</Suspense>
```

## memo (재랜더링 방지)
- 부모 컴포넌트가 재렌더링될 때 자식 컴포넌트의 재랜더링 방지
- 꼭 필요할 때만 랜더링된다 ->기존 props와 바뀐 props를 비교하는 연산이 추가로 진행
    - props가 크고 복잡하면 부담될 수 있어 필요한 때만 사용해야한다
1. memo import 
2. 원하는 컴포넌트 정의부분 감싸기
```javascript
import {memo, useState} from 'react'

let Child = memo( function(){
  console.log('재렌더링됨')
  return <div>자식임</div>
})
// Cart 컴포넌트 안에 Child 컴포넌트 ->  버튼누를 때 Child 도 재랜더링된다
function Cart(){ 
  let [count, setCount] = useState(0)
  return (
    <Child />
    <button onClick={()=>{ setCount(count+1) }}> + </button>
  )
}
```
## useMemo (useEffect와 비슷한 용도)
- 반복문 함수를 useMemo 안에 넣어두면 컴포넌트 로드시 단 1회만 실행
- 재랜더링마다 동작 안해서 효율적이 된다.
- useEffect 처럼 dependency도 넣을 수 있어 특정 state, props가 변할 때만 실행가능

```javascript
import {useMemo, useState} from 'react'

function 함수(){
  return 반복문10억번돌린결과
}
function Cart(){ 
  let result = useMemo(()=>{ return 함수() }, [])

  return (
    <Child />
    <button onClick={()=>{ setCount(count+1) }}> + </button>
  )
}
```
## 리액트 18버전부터 추가된 기능
1. 일관된 batching
- state변경함수를 연달아서 3개 사용하면 마지막 1개만 재랜더링됨
```javascript
setCount(1) 
setName(2) 
setValue(3)   //여기서 1번만 재렌더링됨
```
- ajax요청, setTimeout안에 state변경함수가 있는 경우 batching이 일어나지 않았으나..
- 18버전 이후 부터는 어디 있든 간에 재렌더링은 마지막에 1번만 일어남
```javascript
fetch().then(() => {
    setCount(1)   //재렌더링됨
    setName(2)   //재렌더링됨
}) 
```
- batching이 싫다면 flushSync 함수 사용

2. useTransition 
- 렌더링시간이 매우 오래걸리는 컴포넌트 해결방법
    1. 컴포넌트 안의 html 갯수를 줄이거나
    2. useTransition 기능 사용
```javascript
import {useState} from 'react'

let a = new Array(10000).fill(0)

function App(){
  let [name, setName] = useState('')
  
  return (
    <div>
      <input onChange={ (e)=>{ setName(e.target.value) }}/>
      {
        a.map(()=>{
          return <div>{name}</div>
        })
      }
    </div>
  )
}
```
- 데이터가 10000개 들어있는 array자료를 하나 만들고
- 그 갯수만큼 div를 생성하고 input도 추가하면! 매우 느려진다..
```javascript
import {useState, useTransition} from 'react'

let a = new Array(10000).fill(0)

function App(){
  let [name, setName] = useState('')
  let [isPending, startTransition] = useTransition()
  
  return (
    <div>
      <input onChange={ (e)=>{ 
        startTransition(()=>{
          setName(e.target.value) 
        })
      }}/>
      {
        a.map(()=>{
          return <div>{name}</div>
        })
      }
    </div>
  )
}
```
1. useTransition() 쓰면 그 자리에 [변수, 함수]가 남는다
2. 그 중 우측에 있는 startTransition() 함수로 state변경함수 같은걸 묶으면
3. 그걸 다른 코드들보다 나중에 처리한다
- 단순히 특정코드의 실행시점을 뒤로 옮겨주는 것이므로 html이 많으면 여러 페이지로 나누는게 좋다


### isPending
- startTransition() 으로 감싼 코드가 처리중일 때 true로 변하는 변수
```javascript
{
  isPending ? "로딩중..." : // useTransition 처리완료 후  <div>{name}</div>이 보인다
  a.map(()=>{
    return <div>{name}</div>
  })
} 
```

### useDeferredValue
- startTransition()와 용도 동일
- state 아니면 변수하나를 집어넣을 수 있게 되어있어
- 변수에 변동사항이 생기면 그걸 늦게 처리해줌
```javascript
import {useState, useTransition, useDeferredValue} from 'react'

let a = new Array(10000).fill(0)

function App(){
  let [name, setName] = useState('')
  let state1 = useDeferredValue(name) // 
  
  return (
    <div>
      <input onChange={ (e)=>{ 
          setName(e.target.value) 
      }}/>

      {
        a.map(()=>{
          return <div>{state1}</div>
        })
      }
    </div>
  )
}
```
- useDeferredValue 안에 state를 집어넣으면 그 state가 변동사항이 생겼을 때 나중에 처리된다
- 처리결과는 let state에 저장

## PWA
- 모바일 앱처럼 개발할 수 있는 기술 
### 장점
1. 앱처럼 설치 가능
2. 오프라인에서도 동작 가능
3. 웹사이트에서 바로 설치유도 가능

### 발행
- 파일 2개 (manifest.json, service-worker.js)가 사이트 로컬경로가 있으면 브라우저가 pwa로 인식
- https 사이트여야 함
- 기본 프로젝트를 npm build / yarn build 했을 경우 manifest.json 파일만 생성된
```
//2개 파일 모두 자동 생성 방법
 npx create-react-app 프로젝트명 --template cra-template-pwa
```
1. 위 명령어로 프로젝트 생성
2. 기존 프로젝트의  App.js App.css index.js... 새 프로젝트로 복붙
3. 기존 라이브러리 재설치
4. index.js 변경
```javascript
(index.js)
//serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();
```
5. yarn build / npm run build 했을 때 manifest.json과 service-worker.js 파일이 자동으로 생성

- manifest.json : 아이콘, 이름, 테마색 결정
- service-worker.js : 구동에 필요한 파일 설치 설치 여부 결정
    - 앱을 켤때마다  Cache Storage 내 파일을 사용 (오프라인에서도 사용가능)
  
### 디버깅
1. build 폴더를 에디터로 오픈
2. index.html 우클릭 -> live server로 띄우기
3. 크롬 개발자도구 -> Application 탭 -> manifest/serving workers에서 파일 확인

## sync / async
- 일반적인 자바스크립트는 synchronous(동기적으로)하게 순서대로 처리
- 일부 함수는 asynchronous(비동기적으로) 처리된다
    - 예) ajax, 이벤트리스너, setTimeout, state 변경함수... (물리적으로 잠깐 처리가 보류)
- 버튼을 누를때마다 버튼을 누른 횟수 +1, age state에 +1, 버튼 3번 누르면 age +1 종료 
```javascript
function App(){
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  return (
    <div>
      <div>안녕하십니까 전 {age} 살 입니다</div>
      <button onClick={()=>{
        setCount(count+1);
        if ( count < 3 ) {
          setAge(age+1);
         } }}>+</button> //state 변경함수의 비동기 처리방식 때문 count가 3인데도 코드가 작동된다.
    </div>
  )
}
```
- 해결방법?
```javascript
function App(){
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
 //count 변경 후 age 변경되도록 useEffect 설정
useEffect(()=>{
  if ( count != 0 && count < 3 ) { //처음 페이지 로드될 때에는 실행되지 않도록 하기 
    setAge(age+1)
  }
 }, [count]) 

  return (
    <div>
      <div>안녕하십니까 전 {age} 살 입니다</div>
      <button onClick={()=>{
        setCount(count+1);
      }}>+</button> //state 변경함수의 비동기 처리방식 때문 count가 3인데도 코드가 작동된다.
    </div>
  )
}
```

