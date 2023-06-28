# html 기본
Hypertext <u>Markup Language</u> : Markup Language 란 자료의 구조를 표현하기 위한 언어를 의미한다.

## 인라인 요소와 블록 요소

- 인라인 요소 : 
    - span 
        - 가로세로 너비 지정 불가 
        - 마진, 패딩 위 아래 사용 불가/ 자식요소로 블록요소(div) 사용 불가 같은 인라인 요소 (span)은 가능!

- 블록 요소 : 
    - div : 특별한 의미가 없는 구분을 위한 요소
    - p : 문장 요소
    -  그 외 img 등.. 
​
- input : 인라인 요소와 블록 요소 특징을 모두가짐 / 수평으로 쌓이는 인라인 요소의 특징이 있으나 가로세로 여백 설정 가능

    - value 미리 입락된 값 
    - placeholder : 힌트
    - disabled : 비활성화
    -  label : 제목

## 코드 별 의미

- colspan : Column Span. 열을 몇 칸 확장할 것인지 표시.

- u 와 ins 차이 ? 
    - 결과는 같으나 의미가 다름 
    - u는 밑줄을 그으라는 외형적인 정의
    - ins는 추가된 내용을 의미한다.

- progress 와 meter 의 차이? 
    - 역시 결과는 같으나 의미에서 차이가 있음, 
    - progress 는 작업의 진행 상태를 나타내고 
    - meter는 점유율을 나타냄

- map 태그 : 클라이언트 사이드 이미지맵(클릭할 수 있는 영역을 가지는 이미지)를 의미. 필수 속성인 name 속성은 이미지와 맵 사이 관계를 설정함 

- area 태그 : 이미지맵의 클릭할 수 있는 영역 정의에 사용 ​

- section과 article 차이?
    - article : 독립적이고 홀로 설 수 있는 내용. 예) 블로그 글, 뉴스기사

    - section : 관계있는 문서를 주제 등으로 구분지을 때 사용.


# CSS 기본

## css 표현방식

1. 내장방식 - 복잡해질 수 있음
    - head 태그에 style 태그를 모아 정리

2. 인라인방식 - 주로 글자 표현에 사용. 우선순위 없음
    - body 안에 사용

3. 링크 

4. import 방식- 직렬연결방식

* 우선순위 : 인라인 > 내장 > 외부링크 > 임포트
* 나중에 선언한 스타일이 우선시된다

## 셀렉터 우선순위 (대략적)
- style="" (1000점)
- #id (100점)
- .class (10점) 
- p (1점) 

## css 선택자 :

1. 기본 ( * : 모든 요소 선택자/ 태그이름 : 태그이름 선택자 / . :클래스 선택자 / #  :아이디 선택자 )

2. 복합(연달아 사용금지. 알아보기 어려움) 
    - ABCXY : 동시만족
    - ABC > XYZ : ABC의 자식요소 XYZ 선택
    - ABC XYZ : 선택자 ABC의 하위 요소 XYZ 선택
    - ABC + XYZ : 선택자 ABC의 다음 형제 요소 XYZ 하나를 선택
    - ABC ~ XYZ : 선택자 ABC의 다음 형제 요소 XYZ 모두를 선택
    

3. 가상클래스 (Pseudo-class)
    - ABC:hover : 마우스 커서가 올라가 있는 동안
    - ABC:active :마우스를 클릭하고 있는 동안
    - ABC:focus : 선택자 ABC 요소가 포커스되면 선택
    - ABC:first-child : 선택자 ABC가 형제 요소 중 첫째라면 선택 
    - ABC:last-child 
    - ABC:nth-child(n) : 선택자 ABC가 형제 요소 중 (n)째라면 선택, span div p 어떤 태그든 상관 없음 
    - ABC:not(XYZ) : 선택자 XYZ가 아닌 ABC 요소 선택

4. 가상요소 (ABC::before : 선택자 ABC 요소의 내부 앞에 내용(Content)을 삽입 / ABC::after : 선택자 ABC 요소의 내부 뒤에 인라인 요소인 내용(Content)을 삽입 / [ABC] : 속성 ABC을 포함한 요소 선택)

## 배열
- display (div, p, h1, li 의 기본 배열)
    - block; -> 한줄에 하나씩 배치
    - inline-block; -> 한줄에 여러개 배치. 공백을 그대로 보여주므로 float 사용하는 것이 좋다.
    - inline; -> 컨텐츠 자체만 꾸미기
    - flex; -> 요소 가로정렬 (ex 11 이상부터 사용가능)
    - flex 세부속성
    ```css
    .flex-container {
        display : flex;
        justify-content : center;  /* 좌우정렬 */
        align-items : center;  /* 상하정렬 */
        flex-direction : column; /* 세로정렬 */
        flex-wrap : wrap;  /* 폭이 넘치는 요소 wrap 처리 */
        }
    ```
- position 
    - static; -> body 태그의 기본값. (배치 불가능 / 기본값)
    - relative; -> 요소 자기 자신을 기준으로 배치
    - absolute; -> 부모요소 기준으로 배치 (가장 가까운 부모 중 static이 아닌 요소를 기준으로 배치)
    - fix -> 윈도우 창(뷰포트)을 기준
    - sticky; -> 스크롤영역 기준으로 배치 (조건부 fix)
- float : 요소를 공중에 띄워 정렬. 
    - 하나의 큰 div 박스를 만들고 폭을 지정해주어야 흘러넘치지 않는다.
    - 다음 HTML 요소들이 제자리를 찾지 못하므로 clear 속성이 필요하다.<br>
    `clear : both` 
- 가운데 정렬 : 
```css
.button {
  position : absolute; 
  left : 0;
  right : 0; 
  margin-left : auto;
  margin-right : auto;
  width : 적절히
}
```

## 단위
```css
.box {
  width : 16px; /* 기본 px 단위 */
  width : 1.5rem; /* html태그 혹은 기본 폰트사이즈의 1.5배 */
  width : 2em; /* 내 폰트사이즈 혹은 상위요소 폰트사이즈의 2배 */
  width : 50vw; /* 브라우저(viewport) 화면 폭의 50% */
  width : 50vh; /* 브라우저(viewport) 화면 높이의 50% */
}
```

## 요소 크기 
- margin/ padding : 여백 값 지정. 상, 우, 하, 좌 (시계방향)
    - 주의해야할 margin 버그 : 두 박스의 테두리가 겹쳐지만 마진은 하나로 합쳐지거나 둘 중 더 큰 마진 하나만 적용된다.
        - 부모 박스에 padding 1px 을 주거나 해서 겹쳐지지 않게 해야함. 
- 전체 레이아웃을 감싸는 div 박스를 만들고 미리 width를 지정하는 것이 좋다.
- box-sizing 
    - content-box : 기본값. 박스의 폭은 padding 안쪽까지.
    - border-box : 박스의 폭은 border까지 포함(요소 실제크기 + padding + border)
- CSS Reset : css 초기화 코드 사용 권장. https://codepen.io/pen/ 
- css normalize : 브라우저 간 css 코드 통일. https://github.com/necolas/normalize.css/blob/master/normalize.css  


## 폰트
- Anti-aliasing : 픽셀의 각진 부분을 스무스하게 바꿔주면 부드럽게 표시된다.
```css
transform : rotate(0.04deg); 
```

## 메타 태그, open graph, favicon
```html
<head>
  <link rel="icon" href="경로.ico" type="image/x-icon">
  <meta charset="UTF-8">
  <meta name="description" content="html 공부중.">
  <meta name="keywords" content="HTML,CSS,JavaScript,자바스크립트,코딩">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:image" content="/이미지경로.jpg">
  <meta property="og:description" content="사이트설명">
  <meta property="og:title" content="사이트제목">
</head>
```

## media query
CSS 파일 최하단에 사용
* 권장 : 1200px / 992px / 768px / 576px (보통 1200px 768px 두개만 사용)
```css
@media screen and (max-width : 1200px) { 
  .box { 
    font-size : 40px; 
  } 
} 
```

## 익스플로러 버전용 CSS파일 첨부 (익스 9 미만에서만 적용하는 경우)
```html
<!--[if lt IE 9]>
  <link rel="stylesheet" type="text/css" href="css/ie8.css" />
<![endif]-->
```

## one-way 애니메이션 만드는 법
1. 시작스타일 정하기

2. 최종스타일 정하기

3. 언제 최종스타일로 변할지 트리거 주기 (대부분 :hover)

4. transition 으로 서서히 동작하게 만들기 
    - html css를 그래픽으로 바꿀 때 layout -> 색칠 -> transform 적용 순서로 동작하므로 margin, width 보다 transform을 사용하는 것이 빠르게 동작한다.

## SASS(파일명.scss)
Preprocessor (전처리언어). css 대신 사용하기도 한다.

## transform 
@keyframes 을 이용해 커스텀 애니메이션 정의 가능
```css
.box:hover {
  animation-name : movingmoving;
  animation-duration : 1s;
  animation-timing-function : linear; /*베지어 주기*/
  animation-delay : 1s; /*시작 전 딜레이*/
  animation-iteration-count : 3; /*몇회 반복할것인가*/
  animation-play-state : paused;  /*애니메이션을 멈추고 싶은 경우 자바스크립트로 조정*/
  animation-fill-mode: forwards;  /*애니메이션 끝난 후에 원상복구 하지말고 정지*/
}
```

## Grid 레이아웃 (격자 레이아웃)
 - 만드는 방법 : 부모에 display : grid를 주면 자식 들은 전부 격자처럼 진열
1. 자식 div 높이와 폭을 조정하기 
```css
  grid-column : 1 / 4; /*1~4번째 격자까지 차지*/
  grid-row : 2 / 4;
```

2. 자식에게 이름쓰고 부모가 배치하기 
```css
  grid-area: 헤더;
  grid-area: 사이드;

  (부모 항목)
  display: grid;
  grid-template-areas: 
    "헤더 헤더 헤더 헤더"
    "사이드 사이드 . ."
    "사이드 사이드 . ."
```

## 부트스트랩
- class 명을 이용해 css 조작
```html
<div class="row">
  <p>PC에서는 4열, 태블릿에서는 2열, 모바일에서는 1열로 정렬</p>
  <div class="col-lg-3 col-md-6"> 안녕 </div>
  <div class="col-lg-3 col-md-6"> 안녕 </div>
  <div class="col-lg-3 col-md-6"> 안녕 </div>
  <div class="col-lg-3 col-md-6"> 안녕 </div>
</div>
```
```html
<div class="container ">
  <div class="row">
    <div class="col-2 col-md-2 order-md-2">
      <img src="author.png" width="100%">
    </div>
    <div class="col-10 col-md-5 order-md-1">
      <p>pc에서는 글그림 순이나 모바일에서는 그림글 순으로 표시됩니다.</p>
    </div>
    <div class="col-md-5 order-md-3"></div>
  </div>
</div>  
```
