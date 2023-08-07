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
5. js 파일로 변환하려면 새 터미널을 열고 tsc-w 입력
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

## 문법
```javascript
let 이름 :string = 'kim';
이름 = 123;
let 이름 :string[] = ['kim', 'park']
let 나이 :{ age : number } = { age : number }
let 이름 :string | number = 'kim';
type nameType = string | number;
let 이름 :nameType = 'kim';
type NameType = 'kim' | 'park;
let 이름 :NameType = 'kim';
function 함수명(x :number) :number{
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

type Member = [number, boolean];
let john:Member = [100, false]

type MyObject = {
  name? : string,
  age : number
}
let 철수 :MyObject = { 
  name : 'kim',
  age : 50
}

type MyObject = {
  [key :string] : number,
}
let 철수 :MyObject = { 
  age : 50,
  weight : 100,
}
class Person {
  name;
  constructor(name :string){
    this.name = name;
  }
}
```