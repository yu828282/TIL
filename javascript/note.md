# this
1. window (기본함수 보관소/ 그냥 사용했을 때)
    - 모든 전역변수, 함수, DOM을 보관하고 관리하는 전역객체
```javascript
function 함수(){
  console.log(this)
}
함수();
```
2. undefined (자바스크립트 strict mode의 일반함수에서 사용)
```javascript
<script>
  'use strict';

  function 함수(){
    console.log(this)
  }
  함수();  
</script>
```
3. 메소드를 가지고 있는 오브젝트 (오브젝트 내 함수에서 사용시)
```javascript
var 오브젝트1 = {
  data : 'Kim',
  함수 : function(){ console.log(this) } 
}

오브젝트1.함수(); //{ data : 'Kim', 함수 : f }
```

4. constructor 로 새로 생성되는 오브젝트 (constructor 안에서 사용시)
```javascript
function 기계(){
  this.이름 = 'Kim'; // 새로생성되는 오브젝트의 이름 key값에 'Kim'이라는 value를 집어넣기
}
var 오브젝트 = new 기계(); // {이름 : 'Kim'}
```
5. e.currentTarget (지금 이벤트가 동작하는 곳/ eventlistener 안에서 사용시)
```javascript
document.getElementById('버튼').addEventListener('click', function(e){
  console.log(this)
});
```

# 화살표 함수 (arrow function)
- 외부에 있던 this를 그대로 내부로 가져와서 사용하는 함수
- this값은 함수를 만나면 변하는데, arrow function 안에서는 변하지 않고 외부의 this를 그대로 사용된다
```javascript
var 함수 = () => {}
var 두배만들기 = (x) => { return x * 2 }
var 두배만들기 = x => { return x * 2 } // 파라미터 1개면 ()생략가능
var 두배만들기 = x => x * 2 ;// 리턴 1개면 return 생략가능
```

```javascript
var 오브젝트1 = {
  함수 : function(){ console.log(this) }
}
오브젝트1.함수() //오브젝트1이 출력된다.

var 오브젝트1 = {
  함수 : () => { console.log(this) }
}
오브젝트1.함수() //window 출력됨
```

# Hoisting 현상

```javascript
function 함수(){  
  console.log('hello');
  var 이름 = 'Kim';  
}

// 코드 해석되는 순서
function 함수(){
  var 이름;  // 선언부분이 앞으로 나온다
  console.log('hello');
  이름 = 'Kim';  
}
```
- let 변수는 특이하게도 Hoisting이 되긴 하지만 undefined라는 값이 할당되지 않는다
# 전역변수
- var 키워드로 전역변수 생성시 window에 보관된다
```javascript
  var 나이 = 20;
  console.log(나이); //20
  console.log(window.나이); //20
```

# 문자 다루는 법
```javascript
var pants = 20;
var socks = 100;
`바지${pants} 양말${socks}`;

function 해체분석기(글자들, 변수들1, 변수들2){
    console.log(글자들[1] + 변수들1 + 글자들[0] + 변수들2);
}

해체분석기`바지${pants} 양말${socks}`; // 양말20 바지100
```
# Spread Operator
```javascript
var a = [1,2,3];
var b = [4,5];
var c = [...a, ...b];
```
## apply
- 해당 함수를 특정 오브젝트에 적용해 실행
```javascript
var hi = {
    인사 : function(){
      console.log(this.name + '안녕')
    }
}  
var hi2 = {
    name : 'OOO아, '
}
hi.인사.apply(hi2);
```
## call
- 파라미터 array 사용 불가 (apply는 array 사용가능)

```javascript
var hi = {
    인사 : function(){
      console.log(this.name + '안녕')
    }
}  
var hi2 = {
    name : 'OOO아, '
}
hi.인사.apply(hi2);
hi.인사.call(hi2);
```
