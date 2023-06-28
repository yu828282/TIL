# JavaScript
## 자바스크립트 : html 조작과 변경 담당
- 탭, 모달 등 웹페이지 UI 제작
- 유저가 입력한 데이터 검사
- 이벤트 발생 시 서버로 데이터 요청

## 기본적인 UI 만드는 법칙
1. 미리 html, css로 UI 디자인
2. 숨겨놨다가 이벤트가 발생하면 보여주기
    - 주로 class 를 부착하는 식으로 개발

```css
.hide {
  display : none
}
.show {
  display : block
}
```
## 이벤트?
- 이벤트 : 클릭, 스크롤, 키보드입력, 드래그..
- 이벤트 리스너 : 이벤트가 일어나면 내부 코드를 실행하는 기본 문법
  - e.clientX, e.clientY : 현재 마우스 좌표 확인가능 
  - 모바일 버전은 다름 : touchstart (터치시작시 발동) touchmove (터치중일 때 계속 발동) touchend (터치종료시 발동)

## 콜백함수
- 뭔가 순차적으로 실행하고 싶을 때 많이 보이는 함수형태
- 함수 안의 함수
```JavaScript
셀렉터로찾은요소.addEventListener('scroll', function(){} );
```

## querySelector
- html 을 찾아주는 셀렉터 
(맨 위의 한 개 요소만 선택)
- getElementById( )
- getElementsByClassName( )
- querySelectorAll( )[0]

## jQuery
- 자바스크립트 코드를 줄여주는 라이브러리
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> 

```
- 여러 요소 찾은 뒤 첫번째만 고르기
```JavaScript
$('.tab-button').eq(0).on('click', function(){
  
});
```


## 애니메이션 만드는 법 (one-way)
1. 시작스타일 만들고 (class로)
2. 최종스타일 만들고 (class로) 
3. 원할 때 최종스타일로 변하라고 JS 코드짭니다
4. 시작스타일에 transition 추가 

```css
.black-bg {
  (생략)
  visibility : hidden;
  opacity : 0;
  transition : all 1s;
}
.show-modal {
  visibility : visible;
  opacity : 1;
}
```

```JavaScript
document.querySelector('html').scrollTop;  //현재 웹페이지 스크롤양
document.querySelector('html').scrollHeight; //현재 웹페이지 실제높이
document.querySelector('html').clientHeight; //현재 웹페이지 보이는 높이
```

## 재할당, 재선언
- 할당 : 변수에 대입
- 선언 : 변수 만들기

|var|let|const|
|------|---|---|
|함수 범위|중괄호 범위|중괄호 범위|
|재선언 가능|재선언 불가|재선언 불가|
|재할당 가능|재할당 가능|재할당 불가|

- tab 기능 등에는 var가 아닌 let을 써야한다

## 이벤트 버블링
- 어떤 HTML 태그에 이벤트가 발생하면 그의 모든 상위요소까지 이벤트가 실행되는 현상
- e.target : 실제 이벤트 발생한 곳
- e.currentTarget : 현재 이벤트 리스너가 달린 곳
- e.preventDefault() : 이벤트 기본 동작 막아줌
- e.stopPropagation() : 내 상위요소로의 이벤트 버블링을 중단
- 형제 요소 찾기 : e.target.previousElementSibling.previousElementSibling()  (jQuery함수는 .siblings() )

### jQuery 셀렉터로 찾은 결과와 querySelector 셀렉터로 찾은 결과는 다르다.

```JavaScript	
e.target == $('.black-bg') // 사용불가

$(e.target).is($('.black-bg')) //사용가능
```

## 그 외
- html 안에 유저 몰래 정보를 숨겨놓을 수 있다
```html	
<div data-데이터이름="값"></div> 
```
```JavaScript	
document.querySelector().dataset.데이터이름;
```

## 문자 사이 변수 넣기
```JavaScript	
var a = '안녕';
console.log('문자' + a + '문자');
console.log(`문자 ${a} 문자`);
```


## Select 인풋
- script 안의 코드는 페이지 로드시 1회만 실행된다
- 이벤트 리스너를 이용하면 select 조작 시 매번 실행
```JavaScript	
<script>
  $('.form-select').eq(0).on('input', function(){

    var value = $('.form-select').eq(0).val();
    if (value == '바지') {
      $('.form-select').eq(1).removeClass('form-hide');
    }

  });
</script>
```

## html 생성
1. 방법 1
```JavaScript	
<div id="test"></div>

<script>
  var a = document.createElement('p');
  a.innerHTML = '안녕';
  document.querySelector('#test').appendChild(a);
</script>
```
2. 방법 2 'beforeend'(안쪽 맨 밑에 추가)
```JavaScript	
<div id="test"></div>

<script>
  var a = '<p>안녕</p>';
  document.querySelector('#test').insertAdjacentHTML('beforeend', a);
</script>
```
3. 방법3
```JavaScript	
<div id="test"></div>

<script>
  var a = '<p>안녕</p>';
  $('#test').append(a);
</script>
```

## 반복문
1. for 문
```JavaScript	
  for (let i = 0; i < pants.length; i++){
    <option>~~~~~
  }
  for (var key in obj){
    console.log('안녕')
  }
```
2. forEach 반복문 : array 자료 뒤에 붙여서 사용
  - 두개의 파라미터 사용 가능
  - 첫번째 파라미터 : array 안 자료 하나하나
  - 두번째 파라미터 : 0,1,2...반복문 도는 횟수
```JavaScript	
  var pants = [28, 30, 32];

  pants.forEach(function(a, i){
    console.log(a)
  });
```
```JavaScript	
pants.forEach((a, i)=>{
      var 템플릿 = 
      `<div class="col">
        <h5>${pants[i].title}</h5>
        <p>가격 : ${pants[i].price}</p>
      </div>`;
      $('.row').append(템플릿)
});
```

## arrow function
- 일반함수와의 기능차이 (함수 안에서 this 사용)
  - arrow function은 함수 안에서 this를 재정의해주지 않고 바깥에 있던 this를 사용
  - 이벤트리스너 콜백함수 안에서는 쓰지 말것
```JavaScript	
  var pants = [28, 30, 32];
  pants.forEach(function(a){
    console.log(a)
  });

  pants.forEach((a) => {
    console.log(a)
  });
```

# AJAX
- 서버에 GET, POST 요청을 할 때 새로고침 없이 데이터를 주고받을 수 있게 도와주는간단한 브라우저 기능

## 서버
- 유저가 요청을 하면 데이터를 보내주는 간단한 프로그램
1. 어떤 데이터인지 url로 잘 기재
2. 어떤 방법으로 요청할지 결정 (GET/POST 등) 
* 문자(Json 포함)만 주고받을 수 있다. 

## GET/POST 요청 
- GET요청
  - 서버에 있던 데이터를 읽고싶을 때 주로 사용
  - 가장 쉬운 방법은 브라우저 주소창을 이용
- POST요청
  - 서버로 데이터를 보내고 싶을 때 사용
  - 사용방법
```html 
<form action="요청할url" method="post">
  ```
- GET/POST 단점 : 브라우저가 새로고침된다

## jQuery로 AJAX요청
 -jQuery의 $.get()은 JSON으로 자료가 도착하면 알아서 array/object 자료로 바꿔준다
```JavaScript	
$.get('가져올url')
  .done(function(data){
    console.log(data)
  })
  .fail(function(error){
    console.log('실패')
  });
```

## 자바스크립트로 AJAX요청
- 기본함수 fetch() 이런건 JSON으로 자료가 도착하면 알아서 array/object 자료로 바꿔주지 않아 res.json()코드로 변경해야한다.
```JavaScript	
fetch('가져올url')
  .then(res => res.json())
  .then(function(data){
    console.log(data)
  })
  .catch(function(error){
    console.log('실패함')
  });
```

## array 정렬
1. 오름차순
- 사용 예: 가격 오름차순 정렬
  1. 정렬버튼을 클릭하면
  2. 자료를 가격순으로 정렬하고
  3. 현재 html을 지우고 html을 새로 만들어 표시
  * sort함수는 원본을 변형시키므로 복사본을 만들어 조작하는 경우도 있다.
```JavaScript	
어레이.sort(function(a, b){
  return a - b
}); 
```
- a < b 일 경우 return 우측에 음수 
- a > b 일 경우 return 우측에 양수
- 자바스크립트는 문자끼리 등호 비교 가능 (ㄱ < ㅎ)

2. filter 함수 
- 원하는 자료만 필터링
- 사용 예: 만원 이상 제품만 표시
```JavaScript	
var 어레이 = [7,3,5,2,40];

var 새어레이 = 어레이.filter(function(a){
  return 조건식
}); 
```
3. map 함수
- array 안의 자료들을 전부 변형
- 사용 예: 원화 변경
```JavaScript	
var 어레이 = [7,3,5,2,40];

var 새어레이 = 어레이.map(function(a){
  return a * 4
}); 
```

# DOM
1. 자바스크립트는 html과 다른 언어이다
2. 그런데도 조작이 가능하다.
3. 왜냐면 html을 자바스크립트가 해석할 수 있는 문법으로 변환하기 때문이다
4. 실제로 브라우저는 html페이지를 열 때 html을 object와 비슷한 자료형에 담아준다.
- 즉 DOM이란 : 자바스크립트가 html 정보를 object 형태로 정리한 것
- 브라우저는 html 문서를 위에서 아래로 읽으며 DOM을 생성한다.
- 오류 발생을 막기 위해 자바스크립트를 나중에 실행
```JavaScript	
// html 읽고 코드 실행
$(document).ready(function(){ 실행할 코드 })

document.addEventListener('DOMContentLoaded', function() { 실행할 코드 }) 
```
- 혹은 자바스크립트를 body 태그 마지막에 작성해주면 된다.

## Load 
```JavaScript	
  //document 안의 이미지, js 파일 포함 전부 로드가 되었을 경우 실행할 코드 

$(window).on('load', function(){ 
  실행할 코드
});

window.addEventListener('load', function(){
  실행할 코드
})
```

# 브라우저 저장공간
- 크롬 > 개발자도구 > Application 탭
  1. Local Storage / Session Storage (key : value 형태로 문자, 숫자 데이터 저장가능/ 5MB용량)
  2. Indexed DB (크고 많은 구조화된 데이터를 DB처럼 저장가능, 문법더러움)
  3. Cookies (유저 로그인정보 저장공간)
  4. Cache Storage (html css js img 파일 저장해두는 공간)

## 로컬 스토리지 사용법
```JavaScript	
localStorage.setItem('이름', 'kim') //자료저장
localStorage.getItem('이름') //자료꺼내는법
localStorage.removeItem('이름') //자료삭제
```
- 문자만 저장 가능 (array/object -> Json으로 변환)
    - array/object -> JSON : JSON.stringify()
    - JSON -> array/object : JSON.parse()

```JavaScript	
var arr = [1,2,3];
var newArr = JSON.stringify(arr);

localStorage.setItem('num', newArr);

//꺼내서 쓸 땐
var 꺼낸거 = localStorage.getItem('num');
꺼낸거 = JSON.parse(꺼낸거);
console.log(꺼낸거);
```

