# 03. 코드 품질

## 01-debugging-chrome: 크롬으로 디버깅하기

> **디버깅 (Debugging)**
>
> 스크립트 내 에러를 검출하고 제거하는 과정이다.
> "버그(bug)"를 잡는다는 의미에서 디버깅이라고 부른다.

### Sources 패널 열기

1. 크롬에서 페이지 열기
2. `F12` (Mac: `Cmd+Opt+I`)로 개발자 도구 열기
3. `Sources` 탭 클릭

![Sources 패널](images/03-debugging-chrome/chrome-open-sources.svg)

Sources 패널은 세 영역으로 구성된다:

![Sources 패널 구성](images/03-debugging-chrome/chrome-tabs.svg)

| 영역 | 역할 |
|------|------|
| 파일 탐색 영역 | HTML, JS, CSS, 이미지 등 리소스 목록 |
| 코드 에디터 영역 | 선택한 파일의 소스 코드 |
| 디버깅 영역 | 변수, 콜 스택, 중단점 등 |

### 콘솔

`Esc` 누르면 하단에 콘솔 창이 열린다. 여기서 코드를 직접 실행해볼 수 있다.

![콘솔](images/03-debugging-chrome/chrome-sources-console.svg)

### 중단점 (Breakpoint)

코드 실행을 멈추고 싶은 지점이다. 줄 번호를 클릭하면 설정된다.

![중단점 설정](images/03-debugging-chrome/chrome-sources-breakpoint.svg)

> **중단점 (Breakpoint)**
>
> 자바스크립트 실행이 중단되는 코드 내 지점.
> 중단된 시점에 변수 값을 확인하거나, 한 줄씩 실행하며 추적할 수 있다.

**조건부 중단점**도 있다. 줄 번호에서 우클릭 → `Add conditional breakpoint` → 조건 입력. 조건이 참일 때만 멈춘다.

### debugger 명령어

코드에 직접 작성하는 중단점이다.

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

  debugger;  // 여기서 실행이 멈춤

  say(phrase);
}
```

브라우저 열고 개발자 도구 열고 줄 번호 클릭하는 수고 없이, 에디터에서 바로 중단점을 설정할 수 있어서 편하다.

### 실행이 멈추면 보이는 것들

![디버거 일시정지](images/03-debugging-chrome/chrome-sources-debugger-pause.svg)

| 패널 | 역할 |
|------|------|
| **Watch** | 원하는 표현식의 값을 확인. `+` 버튼으로 추가 |
| **Call Stack** | 함수 호출 순서. 어떤 경로로 여기까지 왔는지 |
| **Scope** | 현재 시점의 변수들. Local(지역), Global(전역) |

> **콜 스택 (Call Stack)**
>
> 함수 호출 기록이 쌓이는 곳이다.
> ```js
> function a() { b(); }
> function b() { c(); }
> function c() { debugger; }
> a();
> ```
> 이 시점에 콜 스택: `c` → `b` → `a` (위에서 아래로)
>
> 현재 실행 중인 함수가 맨 위, 처음 호출한 함수가 맨 아래.

### 디버깅 버튼들

![디버거 버튼](images/03-debugging-chrome/chrome-sources-debugger-trace-1.svg)

| 버튼 | 단축키 | 역할 |
|------|--------|------|
| **Resume** | `F8` | 다음 중단점까지 실행 계속 |
| **Step** | `F9` | 다음 문 실행 |
| **Step over** | `F10` | 다음 문 실행, 함수 안으로 안 들어감 |
| **Step into** | `F11` | 다음 문 실행, 함수 안으로 들어감 |
| **Step out** | `Shift+F11` | 현재 함수 끝까지 실행하고 빠져나옴 |

> **Step vs Step over 차이**
>
> ```js
> function outer() {
>   inner();  // ← 현재 여기
>   console.log("done");
> }
> ```
>
> - **Step (F9)**: `inner()` 함수 안으로 들어감
> - **Step over (F10)**: `inner()` 실행하고 바로 `console.log`로 감
>
> 함수 내부가 궁금하면 Step, 안 궁금하면 Step over.

### console.log

디버거 없이 간단하게 값을 확인할 때 쓴다.

```js
for (let i = 0; i < 5; i++) {
  console.log("숫자", i);
}
// 콘솔에 0, 1, 2, 3, 4 출력
```

복잡한 버그는 디버거로, 간단한 확인은 `console.log`로. 적절히 섞어 쓰면 된다.

> **console 메서드들**
>
> | 메서드 | 용도 |
> |--------|------|
> | `console.log()` | 일반 출력 |
> | `console.error()` | 에러 (빨간색) |
> | `console.warn()` | 경고 (노란색) |
> | `console.table()` | 배열/객체를 표 형태로 |
> | `console.time()` / `console.timeEnd()` | 실행 시간 측정 |
>
> ```js
> console.table([{name: "John", age: 30}, {name: "Jane", age: 25}]);
> ```

### 실행이 중단되는 경우

1. 중단점을 만났을 때
2. `debugger` 문을 만났을 때
3. 에러 발생 시 (예외 발생 시 멈춤 옵션이 켜져 있을 때)

