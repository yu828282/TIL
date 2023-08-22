# 텐서플로우
- 딥러닝 구현을 위해 구글에서 만든 파이썬 라이브러리
- 페이스북의 pytorch와 많이 비교된다
- 파이썬 3.X 64bit 버전에서 사용
- 텐서 자료형 사용
```python
텐서 = tf.constant( [1,2,3] )
print(텐서)
w = tf.Variable(1.0) # 가중치 설정
tf.assign(2) # 가중치 변경
```

## Tensorflow GPU로 구동
- 버전 조합 확인 https://www.tensorflow.org/install/source_windows#tested_build_configurations

1. Nvidia의 CUDA 라이브러리를 이용한 연산을 지원
    - https://developer.nvidia.com/cuda-gpus
2. 다음 소프트웨어 설치
- NVIDIA® GPU 드라이버 (CUDA 10.1에는 418.x 이상이 필요함)
- CUDA® Toolkit (TensorFlow 2.1이상에서는 CUDA 10.1을 지원)
- cuDNN (7.6 이상 필요, CUDA 10.1의 경우...)
    - \cuda\bin\cudnn*.dll 파일을 C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\bin 폴더 안에 붙여넣기
    - \cuda\include\cudnn*.h 파일을 C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\include 폴더 안에 붙여넣기
    - \cuda\lib\x64\cudnn*.lib 파일을 C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\lib\x64 폴더 안에 붙여넣기
    - 시작 > 환경 변수 편집 > 고급 > 환경변수 > 시스템변수의 Path 편집 >C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\bin
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\libnvvp

3. msvc 2019 컴파일러 (필요시)
- https://visualstudio.microsoft.com/ko/vs/features/cplusplus/

4. GPU 구동 확인
```python
import tensorflow as tf
if tf.test.gpu_device_name():
    print('Default GPU Device: {}'.format(tf.test.gpu_device_name()))
```
# 딥러닝
- 머신러닝 : 컴퓨터를 학습시키는 것
    - 일정부분 가이드라인 필요
    - 컴퓨터에게 예측 수식에 대한 가중치(weigh)를 찾도록 하는 것
    - 종류     
    1. 지도학습 : 데이터에 정답이 있고, 정답을 예측하는 모델을 만드는 것
    2. 비지도학습 : 데이터에 정답이 없고, 분류하는 모델을 만드는 것
    3. 강화학습 : 최대의 보상을 가져오는 행동을 찾는 것
- 딥러닝 : 컴퓨터를 학습시키는 것
    - 가이드 불필요
    - 뉴럴 네트워크(신경망)를 이용해 머신러닝을 진행
        - 뉴럴 네트워크 : 뇌신경망을 본따서 만든 머신러닝 알고리즘
    - 머신러닝보다 적용할 수 있는 문제가 매우 많다
        - 개발자가 의료지식이 없어도 암 판정 AI 생성 가능!
    - 딥러닝이 매우 잘하는 분야
        1. 이미지 분류/ object 찾기 : 자율주행 등..
        2. 순서가 있는 sequence data 분석과 예측 : 번역
    - 컴퓨터에게 신경망을 통해 예측 수식에 대한 가중치(weigh)를 찾도록 하는 것

## 퍼셉트론(Perceptron)
- 초기의 인공신경망 알고리즘
- 인공 신경망(Aritificial Neural Network, ANN)의 구성 요소(unit)로서 여러 값을 입력받아 하나의 값으로 출력하는 알고리즘
- input layer  > hidden layer > output layer 
    - hidden layer : 신경망 구조의 특징(딥러닝과 머신러닝의 차이!), 여러개가 있으면 Deep Neural Network라 부른다. 추론한 값을 잠시 저장하는 구간
- <b>가중치, 편향</b>을 매개변수로 설정
- 차 사진을 신경망에 넣었더니 정답에 대한 가이드 없이 혼자서 특징추출(feature extraction)을 해냄
- layer : node(숫자)의 구성으로 이루어져 있다. 
- node 계산법 : 연관된 노드들을 w(가중치)를 곱하고, 활성함수를 통해 연산결과를 변형시킨다
    - 활성함수 : 비선형적이고 복잡한 예측 가능, 딥러닝 인공신경망의 필수요소
        - 활성함수 종류 : hyperbolic tangent(-1~1), sigmoid(0~1), softmax(0~1, 총합이 1), Rectified Linear(0~양수인풋)
        - 시그모이드 : 이진분류모델의 마지막 활성화 함수
        - 소프트맥스 : 다중분류모델의 마지막 활성화 함수
        - ReLU : 기본적으로 은닉층에 사용하는 활성화 함수
- 오차(Loss)를 최소화하는 w를 찾아야 함
    - 손실함수 (Loss function/ Cost function) : 총 오차를 계산하는 수식
    
## 경사하강법 (Gradient descent)
- Loss값을 최소화하는 최적의 w1를 찾는 방법
1. 첫 w1은 랜덤으로 설정
2. 총손실 E를 계산
3. 이후 경사하강법을 사용해 w값을 증가/ 감소 시킨다
    - 현재 w1값에서의 접선의 기울기를 w1에서 빼기 
    - 새 W1 = 기존W1 - 기존w1이 변할 때의 총손실 E 변화량(편미분) * learning rate
        - learning rate : 최적의 w를 찾을 수 있도록 설정하는 상수 (2, 3, 0.01...)
4. 새 W값을 바탕으로 총손실 E를 계산, 경사하강으로 새 W 업데이트.....(반복)
5. 기울기 0일 때 경사하강 종료

### learning rate optimizer 
- 학습 중간중간 learning rate를 수정하는 방식
1. SGD : 전체가 아닌 무작위로 데이터셋을 섞어 특정 크기의 데이터 대해 모델 학습
2. Momentum : 가속도 유지
3. AdaGrad : 자주 변하는 w는 작게, 자주 안변하면 크게
4. RMSProp : AdaGrad 제곱
5. Adam : RMSProp + Momentum -> 일반적으로 결과가 잘 나온다
6. AdaDelta : AdaGrad에서 알파가 너무 작아져서 학습 안되는 걸 방지

### 오차 측정 방법
1. 평균 제곱 오차 (Mean Squared Error, MSE): 실제값과 예측값의 차이를 제곱하여 평균한 값으로, 주로 회귀 분석에서 사용
2. 평균 절대 오차 (Mean Absolute Error, MAE): 실제값과 예측값의 차이를 절댓값으로 변환하여 평균한 값으로, 회귀 분석에서도 많이 사용. MSE와 비교해 이상치(Outliers)에 덜 민감하다.
3. R제곱 (R-squared, R²): 실제값과 예측값 사이의 설명력을 측정하는 지표로, 회귀 분석에서 사용. R² 값은 0과 1 사이의 값을 가지며, 1에 가까울수록 모델이 데이터를 잘 설명한다는 의미를 가진다
4. 로그 손실 (Logarithmic Loss 또는 Log Loss): 분류 모델에서 사용되며, 모델의 예측값과 실제 클래스 레이블 사이의 차이를 계산하는데 사용
5. 혼동 행렬 (Confusion Matrix): 분류 모델의 성능 평가에 사용되는 지표로, True Positive(TP), True Negative(TN), False Positive(FP), False Negative(FN)을 계산하여 모델의 정확도, 정밀도, 재현율 등을 계산
6. 정확도 (Accuracy): 분류 모델에서 맞게 분류된 샘플의 비율을 나타내는 지표
7. F1 점수 (F1 Score): 정밀도와 재현율의 조화 평균으로 계산되는 지표로, 분류 모델의 성능 평가에 사용

### 역전파 알고리즘
- 복습하기

### 간단한 머신러닝 : 키, 몸무게 예측 (Linear Regression)
1. 모델만들기
2. optimizer, 손실함수정하고
3. 학습 (경사하강법으로 변수값 업데이트)

```python
import tensorflow as tf

키 = 170
신발 = 260
# 신발 = 키 * a + b

a = tf.Variable(0.1)
b = tf.Variable(0.2)

def 손실함수():
  예측값 = 키 * a + b
  return tf.square(260 - 예측값) # -가 되는걸 방지하기 위해서 제곱을 해준다
  #return tf.keras.losses.mse(260, 예측값)

opt = tf.keras.optimizers.Adam(learning_rate=0.1) #경사하강법

for i in range(300): # 경사하강법 300번 해주기
  opt.minimize(손실함수, var_list=[a,b]) # 
  print(a.numpy(), b.numpy())
# 0.20000002 0.3
# 0.299743 0.39974296
# 0.39902854 0.4990285
# 0.4976288 0.5976288
# ...
# 1.5198832 1.6198832
# 1.5198832 1.6198832
# 1.5198832 1.6198832
```

# Recurrent Neural Network 
- 한번에 하나의 데이터만 순서대로 넣어 학습
- 순서가 의미있어지는 딥러닝 학습 가능
- sequence 데이터를 입출력 가능
      - sequence : 순서의 개념이 있는 데이터
- 응용
    1. vector to sequence (이미지 자동캡션)
    2. sequence to vector (글의 감정분석하기, 악플검사하기)
    3. sequence to sequence (번역)

- 단점 : Diminishing Gradient (초기 입력값들의 비중이 낮아져 성능이 낮아짐)
##  Long Short Term Memory
- 장기 기억가능 (Cell State)
      - output : cs + hidden state
- 구조?
      1. forget gate : 필요없는 데이터 삭제
      2. input gate : 중요한 데이터 장기기억으로 보냄
      3. output gate : hidden state(output) 연산
