# React-Bootstrap 라이브러리
## 설치
- 설치 방법 1 : 터미널
```
npm install react-bootstrap bootstrap 
```
- 설치 방법 2 : react bootstrap 사이트의 css link 복붙 (index.html -> head)
- 설치 방법 3 :  
```javascript
(App.js)
import 'bootstrap/dist/css/bootstrap.min.css';
```
## 사용
- 해당요소 import 후 사용
```javascript
import {Navbar, Nav, Container} from 'react-bootstrap'
```
- 원조 Bootstrap 요소는 import 안해도 사용 가능하다.


# img 
## 넣는법
- 기본
    1. 이미지 파일을 src 폴더에 넣는다. 
    2. url() 코드 사용
```css
url('./bg.png');
```
- html 파일 안에서 넣기
    1. 이미지 파일을 src 폴더에 넣는다.
    2. 이미지를 import 후
    3. 필요한 곳에서 작명한 것을 사용
```javascript
import bg from './bg.png'

function App(){
  return (
    <div>
      <div className="main-bg" style={{ backgroundImage : 'url(' + bg + ')' }}></div>
    </div>
  )
}
```

# public 폴더
## 용도
- 여러 소스코드(js파일)는 src 폴더에 보관하면 되지만..
- 이미지, txt, json 등 수정이 필요없는 static 파일의 경우 public 폴더에 보관해도 무방
    - build 작업(코드를 한 파일로 압축)을 해도 public 폴더 내 파일은 그대로 보존된다.
## 사용
- /이미지 경로
```html
<img src="/logo192.png" /> 
```
- 권장되는 방식 : ~.com/aaa/ 경로에 배포시 파일을 찾을 수 없는 경우가 있음
```html
<img src={process.env.PUBLIC_URL + '/logo192.png'} />  
```

# state import
## 상품정보를 state로 만들고 싶으나 useState()에 넣기 너무 길 때 사용
- 변수, 함수, 자료형 전부 export 가능
- 파일마다 export default 라는 키워드는 하나만 사용가능
- 파일경로는 ./ (현재경로) 부터 시작

## 단일 변수 import
1. 파일 하단에 export default 변수명; 사용
2. 다른 파일에서 import 해 사용
```javascript
(data.js 파일)

let a = 10;
export default a;

```
```javascript
(App.js 파일)

import a from './data.js';
console.log(a)
```

## 여러 변수 import
1. 파일 하단에 export {변수명..} 사용
2. 다른 파일에서 import 해 사용
```javascript
(data.js 파일)

var name1 = 'Kim';
var name2 = 'Park';
export { name1, name2 }
```
```javascript
(App.js 파일)

import { name1, name2 } from './data.js';
```

# react-router-dom
## 사용이유 : 쉽게 페이지를 나누고 보여주기 위해서..
1. 리엑트는 html 파일을 하나만 사용한다.
2. 다른 페이지를 보여주려면 내부 div를 변경해야하는데
3. 직접 코드를 짜기보단 외부 라이브러리인 react-router-dom로 구현하는 것이 편하다.

## 설치
```javascript
npm install react-router-dom@6
```
## 사용
1. index.js 에서 import
2. BrowserRouter 로 App을 감싸줌 
```javascript
(index.js)
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter> <App /></BrowserRouter>
  </React.StrictMode>
); 
```
3. App.js 에서 import
4. Rouths 를 만들고 내부에 Routh 작성
5. <Route path="/url경로" element={ <보여줄html> } />

```javascript
(App.js)
import { Routes, Route, Link } from 'react-router-dom'

function App(){
  return (
    (생략)
    <Routes>
      <Route path="/detail" element={ <div>상세페이지</div> } />
      <Route path="/about" element={ <div>어바웃페이지</div> } />
    </Routes>
  )
}
```
## 링크 만드는 방법 1 : Link
1. App.js 에서 import
2. 원하는 위치에서 Link 사용
```html
<Link to="/">홈</Link>
<Link to="/detail">상세페이지</Link>
```
## 링크 만드는 방법 2 : useNavigate()
1. App.js 에서 import
2. useNavigate() 선언 후 사용
- 숫자도 넣을 수 있다
  - navigate(2) : 2번 앞으로 가기
  - navigate(-1) : 1번 뒤로 가기
```javascript
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App(){
  let navigate = useNavigate()
  
  return (
    (생략)
    <button onClick={()=>{ navigate('/detail') }}>이동버튼</button>
  )
}
```
## 404 페이지 만드는 방법
```html
<Route path="*" element={ <div>없는페이지입니다</div> } />
```
## 서브경로
- 표현방법 1
```html
<Route path="/about/member" element={ <div>멤버들</div> } />
<Route path="/about/location" element={ <div>회사위치</div> } />
```

- 표현방법 2
```html
<Route path="/about" element={ <About/> } >  
  <Route path="member" element={ <div>멤버들</div> } />
  <Route path="location" element={ <div>회사위치</div> } />
</Route>
```
- 그러나 /about/member 경로를 들어가도 div 안의 정보는 보이지 않는다.
- Outlet을 이용해 어디에 표시해줘야할지 정해야함!

```javascript
function About(){
  return (
    <div>
      <h4>about페이지</h4>
      <Outlet></Outlet>
    </div>
  )
}
```
## 여러 상세 페이지 만들기
- URL 파라미터 문법을 사용한다
- path 작명할 때 /:~~~ 이렇게 사용하면 "아무 문자"를 뜻함
```html
<Route path="/detail/0" element={ <Detail shoes={shoes}/> }/>
<Route path="/detail/1" element={ <Detail shoes={shoes}/> }/>
(...)
```
```html
<Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>
```

- path 작명시 url 파라미터는 몇번이고 사용가능
  - 예) detail/:어쩌구/:저쩌구
## 상세 페이지마다 내용 다르게 설정
- useParams 로 유저가 url 파라미터에 입력한 값을 가져오기

```javascript
import { useParams } from 'react-router-dom'

function Detail(){
  let {id} = useParams();
  
  return (
    <div className="container>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
        <h4 className="pt-5">{props.shoes[id].title}</h4>
        <p>{props.shoes[id].price}원</p>
        <button className="btn btn-danger">주문하기</button>
      </div>
    </div>
  </div>
  )
}
```
- 혹은 자료 순서에 관계없이 id 값을 찾아서 출력

```javascript
import { useParams } from 'react-router-dom'

function Detail(){
  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });
  
  return (
    <div className="container>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.price}원</p>
        <button className="btn btn-danger">주문하기</button>
      </div>
    </div>
  </div>
  )
}
```

# styled-components
## 컴포넌트가 많은 경우 문제점
1. class 만들어놓은걸 까먹고 중복해서 또 만들거나
2. 갑자기 다른 이상한 컴포넌트에 원하지않는 스타일이 적용되거나
3. CSS 파일이 너무 길어져서 수정이 어렵거나
- 스타일을 만들어서 컴포넌트를 만든다면?
## 설치
```
npm install styled-components
```
## 사용
1. import
2. styled 적용 (styled.div, styled.p)
3. 백틱 기호로 CSS 스타일 넣기
4. 변수로 저장해 사용
```javascript
import styled from 'styled-components'

let Box = styled.div`
  padding : 20px;
  color : grey
`;
let YellowBtn = styled.button`
  background : yellow;
  color : black;
`;

function Detail(){
  return (
    <div>
      <Box><YellowBtn>버튼임</YellowBtn></Box>
    </div>
  )
}
```
## styled-components 장점
1. CSS 파일 오픈할 필요없이 JS 파일에서 바로 스타일넣을 수 있다.
2. 스타일이 다른 JS 파일로 오염되지 않는다.
3. 페이지 로딩시간 단축된다. (html 페이지의  style 태그에 들어간다)
- props 지원
```javascript
import styled from 'styled-components';

let YellowBtn = styled.button`
  background : ${ props => props.bg };
`;

function Detail(){
  return (
    <div>
        <YellowBtn bg="orange">오렌지색 버튼</YellowBtn>
        <YellowBtn bg="blue">파란색 버튼</YellowBtn>
    </div>
  )
}
```
```javascript
let YellowBtn = styled.button` 
  background : ${ props => props.bg };
  color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
`; 
```
## styled-components 단점
1. JS 파일이 복잡해지고 일반 컴포넌트/ styled 컴포넌트 구분이 어렵다.
2. JS 파일 간 중복 디자인이 많아져 import해서 사용-> css 파일 사용과 큰 차이 없다.
3. styled-components 문법을 모르는 동료?

# Lifecycle hook
## 컴포넌트의 인생 
1. 생성 (전문용어로 mount)
2. 재렌더링 (전문용어로 update)
3. 삭제 (전문용어로 unmount)

## hook 사용방법
- hook(갈고리)를 달아서 컴포넌트의 특정 시기에 코드 실행 가능
1. import 
2. 콜백함수 추가해서 안에 코드 작성
3. 해당 코드는 컴포넌트 생성/ 재렌더링 시 실행된다.

```javascript
import {useState, useEffect} from 'react';

function Detail(){
  useEffect(()=>{
    console.log('안녕')
  });  
  return (생략)
}
//index.js에 <React.StrictMode>라는 태그가 있으면 2번 출력된다(디버깅용)
```
## useEffect 코드
- useEffect 안에 적은 코드는 html 렌더링 이후에 동작
- 주로 핵심기능 외 side effect를 코드에 적는다.
- 오래걸리는 반복연산, 서버에서 데이터가져오는 작업, 타이머 등등..

## 예) 2초 후 없어지는 알림창
```javascript
function Detail(){
  let [alert, setAlert] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{ setAlert(false) }, 2000)
  }, [])

  return (
  {
    alert == true
    ? <div className="alert alert-warning">
        2초이내 구매시 할인
      </div>
    : null
  }
  )
}
```
## 실행조건
```javascript
useEffect(()=>{ 실행할코드 }, [count])
```
- [ ]에는 여러 state를 넣을 수 있고, [ ]내 변수나 state가 변할 때만 useEffect 안의 코드를 실행
- [ ]를 비워두면 컴포넌트 mount시 (로드시) 1회 실행하고 영영 실행해주지 않는다.

## clean up function
- useEffect 동작 전에 특정코드를 실행하고자 할 때 사용
```javascript
useEffect(()=>{ 
  그 다음 실행됨 
  return ()=>{
    여기있는게 먼저실행됨
  }
}, [count])
```

```javascript
useEffect(()=>{ 
  let a = setTimeout(()=>{ setAlert(false) }, 2000)
  return ()=>{
    clearTimeout(a)
  }
}, [])
```

## 최종정리
1. 재랜더링마다 코드 실행
```javascript
useEffect(()=>{ 실행할코드 })
```
2. 컴포넌트 mount시 (로드시) 1회만 실행
```javascript
useEffect(()=>{ 실행할코드 }, [])
```
3.  useEffect 안의 코드 실행 전에 항상 실행
```javascript
useEffect(()=>{ return ()=>{ 실행할코드 } })
```
4. 컴포넌트 unmount시 1회 실행
```javascript
useEffect(()=>{ return ()=>{ 실행할코드 } }, [])
```
5. state1이 변경될 때만 실행
```javascript
useEffect(()=>{ 실행할코드 }, [state1])
```
