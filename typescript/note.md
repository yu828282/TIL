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
    }
}
// es5 버전 자바스크립트로 컴파일(변환)
// 'module'은 자바스크립트 파일간 import 문법을 구현할 때 어떤 문법을 쓸지 정하는 곳 (require 문법 사용)
```
 - 추가로 넣을만한 것
```javascript
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "noImplicitAny": true,  // any 타입 발생시 에러 띄워주기
        "strictNullChecks": true // null, undefined 타입관련 에
    }
}
```
6. js 파일로 변환하려면 새 터미널을 열고 tsc-w 입력
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

## 문법정리
```javascript
let 이름 :string = 'kim'; // 문자만 들어올 수 있다
이름 = 123; // 에러

let 이름 :string[] = ['kim', 'park'] //array 안에 string 만 들어올 수 있다

let 나이 :{ name : string } = { age : number }

let 나이 :{ name? : string } = { } //name 속성은 옵션

let 이름 :string | number = 'kim'; //string 혹은 number 다 들어올 수 있다

type NameType = string | number; // 타입을 변수로 저장 가능
let 이름 :NameType = 'kim';

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
