# Typescript
## 사용이유
- 자바스크립트의 대용품
- 자바스크립트는 Dynamic typing 을 지원 -> 타입을 알아서 변경
- 타입스크립트는 잘못된 타입을 에러로 잡아줄 수 있다

## 설치
1. Nodejs 최신버전, VScode 에디터를 설치
2. VScode 에디터에서 터미널 열고 입력
```javascript
npm install -g typescript
```
3. 작업폴더 생성 후 에디터로 오픈
4. .ts 형식의 파일 만들기
5. tsconfig.json 생성 ( .ts 파일들을 .js 파일로 변환할때 옵션 설정이 가능)
  ```javascript
  {
      "compilerOptions": {
          "target": "es5", // 'es3', 'es5', 'es2015', 'es2016', 'es2017','es2018', 'esnext' 가능
          "module": "commonjs", //무슨 import 문법 쓸건지 'commonjs', 'amd', 'es2015', 'esnext'
          //추가할만한 것
          "noImplicitAny": true,  // any 타입 발생시 에러 띄워주기
          "strictNullChecks": true // null, undefined 타입관련 에
      }
  }
  // es5 버전 자바스크립트로 컴파일(변환)
  // 'module'은 자바스크립트 파일간 import 문법을 구현할 때 어떤 문법을 쓸지 정하는 곳 (require 문법 사용)
  ```
6. js 파일로 변환하려면 새 터미널을 열고 tsc -w 입력
```javascript
<script src="변환된파일.js"></script>
```


### React 프로젝트에서 설치
1. 이미 만든 React 프로젝트에 설치
```javascript
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```
2. 새 React 프로젝트에 설치
```javascript
npx create-react-app my-app --template typescript
```

## 기본문법 
```javascript
let 이름 :string = 'kim'; // 문자만 들어올 수 있다

let 이름 :string[] = ['kim', 'park'] //array 안에 string 만 들어올 수 있다

let 나이 :{ name : string } = { age : number }
let 내정보 : { age : number } = { age : 20 }
var 좋아하는거 :{ song :string, singer :string } = { song : '사랑하기때문에', singer : '유재하' }

let 나이 :{ name? : string } = { } //name 속성은 옵션
```
### type 키워드는 재정의가 불가능
## Union Type (타입 2개 이상 사용시)
```javascript
let 이름 :string | number = 'kim'; //string 혹은 number 다 들어올 수 있다
let 나이: (string | number) = 100;
var 어레이: (number | string)[] = [1,'2',3]
var 오브젝트: {data : (number | string) } = { data : '123' }
```


## 타입 정의가 너무 길면 Type Aliases (별칭)
```javascript
type NameType = string | number; // 타입을 변수로 저장 가능
let 이름 :NameType = 'kim';
```

## 함수 
```javascript
function 함수명(x :number) :number{ // x는 number, return은 number 
  return x * 2
}

//에러
function 함수명(x :number | string) { 
  return x * 2
}

//가능
function 함수명(x :number | string) {
  if (typeof x === 'number'){
    return x * 2
  } 
}
```
- void 타입 : return할 자료가 없는 함수의 타입으로 사용가능
```javascript
function 내함수(x :number) :void { 
  return x * 2 //에러발생
} 
```
- 파라미터가 옵션일 때 
```javascript
function 내함수(x? :number) { }
//function 내함수(x : number | undefined) { } 와 동일

내함수(); //가능

function 내함수(x? :number) :number { 
  return x * 2 
} //불가능, 파라미터 정의가 확실하지 않아서..

```
-  union type 에는 조작을 못하게 되어 있다
```javascript
function 내함수(x :number | string){
   return x + 1  //에러 
}

function 내함수(x :number | string){
  if (typeof x === 'number') {
    return x + 1
  } 
  else if (typeof x === 'string') {
    return x + 1
  }
  else { //else 문이 없으면 에러
    return 0
  } //에러 없이 동작
}
```
- as 키워드를 이용해 타입을 간주하게 할수도 있다.
```javascript
function 내함수(x :number | string){ 
    return (x as number) + 1 
}
```

## any 타입
- 버그 추적 해제 (비상시에만 쓸 것)
```javascript
let 이름: any = 'kim';
```
## unknown 타입
1. unknown 타입엔 모든 자료 다 집어넣을 수 있음
2. 자료집어넣어도 타입은 그대로 unknown
```javascript
let 이름: unknown = 'kim';
이름 = 123;
이름 = undefined;
이름 = [];
```

### 주의 : 왼쪽 타입이 number일 때만 연산 가능
- const 변수는 재할당은 막지만 그 안에 있는 object 속성 바꾸는 건 관여하지 않는다
```javascript
let 나이: string|number;
나이 + 1; //에러
let 나이: unknown = 1;
나이 + 1; //에러
```
## readonly
```javascript
type Girlfriend = {
  readonly name : string,
}

let 여친 :Girlfriend = {
  name : '엠버'
}

여친.name = '유라' //readonly라서 에러가 발생..
```

```javascript
// array에 쓸 수 있는 tuple 타입
type Member = [number, boolean]; //무조건 첫번째는 number, 두번째는 boolean
let john:Member = [100, false]

type MyObject = {
  name? : string,
  age : number
}

let 철수 :MyObject = { 
  name : 'kim',
  age : 50
}

// object 타입 지정해야할 속성이 너무 많으면
type MyObject = {
  [key :string] : number, // 글자로 된 모든 object 속성의 타입은 number
}
let 철수 :MyObject = { 
  age : 50,
  weight : 100,
}

// class 타입 지정해야할 속성이 너무 많으면
class Person {
  name :string;
  constructor(name :string){
    this.name = name;
  }
}
```
## 문법 팁
- 변수 생성시 타입스크립트가 자동으로 타입 부여
- 간단한 변수는 생략하는 것이 좋다

## 연습문제
```javascript
let project = {
  member : ['kim', 'park'],
  days : 30,
  started : true,
}
```
- 타입스크립트에서는?
```javascript
let project :{
  member : string[],
  days : number,
  started : boolean,
} = {
  member : ['kim', 'park'],
  days : 30,
  started : true,
}
```

## literal type
- 특정 글자나 숫자만 가질 수 있게 제한
```javascript
let 방향: 'left' | 'right';
방향 = 'left'; //  이제 방향은 'left' 또는 'right' 글자만 가질 수 있다
```

## as const 문법
1. 타입을 object의 value로 바꿔줌
2. object안에 있는 모든 속성을 readonly로 바꿔줌 (변경하면 에러나게)
```javascript
var 자료 = {  name : 'kim'} as const;

function 내함수(a : 'kim') { }

내함수(자료.name)
```

## 화살표 함수
```javascript
type NumOut = (x : number, y : number ) => number 
let ABC :NumOut = function(x,y){
  return x + y
}
```
## HTML 변경과 조작
1. "strictNullChecks": true
2. HTML 찾고 변경해보기 -> 오류 (셀렉터로 html을 찾으면 타입이 Element | null이라..)
  1. narrowing
  ```javascript
  let 제목 = document.querySelector('#title');
  if (제목 != null) {
    제목.innerHTML = '반갑소'
  }
  ```
  2. instanceof 사용
  ```javascript
  let 제목 = document.querySelector('#title');
  if (제목 instanceof HTMLElement) {
    제목.innerHTML = '반갑소'
  }
  ```
  3. assertion
  ```javascript
  let 제목 = document.querySelector('#title') as HTMLElement;
  제목.innerHTML = '반갑소'
  ```
  4. optional chaining 연산자
  ```javascript
  let 제목 = document.querySelector('#title');
  if (제목?.innerHTML != undefined) {
    제목.innerHTML = '반갑소'
  }
  ```
  5. strict 설정 false로
  
### 이벤트리스너 부착
```javascript
let 버튼 = document.getElementById('button');
버튼?.addEventListener('click', function(){
  console.log('안녕')
}) 
  ```
