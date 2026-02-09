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

---

## 02-coding-style: 코딩 스타일

코드는 간결하고 읽기 쉬워야 한다. 복잡한 문제를 읽기 쉬운 코드로 풀어내는 게 진짜 실력이다. 무조건 따라야 할 규칙은 없지만, 어떤 스타일이 왜 좋은지 알아두면 도움이 된다.

### 중괄호

여는 중괄호는 키워드와 같은 줄에 쓴다. 이집션(Egyptian) 스타일이라고 부른다.

```js
if (condition) {
  // 코드
}
```

> **이집션 스타일 (Egyptian Style)**
>
> 이집트 피라미드 벽화에서 사람들이 몸은 정면인데 팔은 옆으로 꺾어서 그린 모양이
> `){` 이 형태랑 비슷하다고 해서 붙은 이름이다.
> 자바스크립트는 거의 다 이 스타일을 쓴다. Airbnb, Google 스타일 가이드 전부 이집션 스타일.
>
> ```js
> // 이집션 스타일 - 같은 줄에 열기
> if (condition) {
> }
>
> // 다른 스타일 - 새 줄에 열기 (C#, Java 쪽에서 가끔 봄)
> if (condition)
> {
> }
> ```

한 줄짜리 코드라도 중괄호로 감싸는 게 좋다.

```js
// 이것보다
if (n < 0) alert("음수입니다");

// 이게 낫다
if (n < 0) {
  alert("음수입니다");
}
```

나중에 코드 추가할 때 실수할 여지를 줄여준다. 02-first-steps에서도 나왔던 얘기다.

### 가로 길이

한 줄이 너무 길면 여러 줄로 나눈다. 보통 80자나 120자로 제한하는데, 요즘은 모니터가 넓어져서 120자 쓰는 팀이 더 많은 추세다.

```js
// 백틱으로 문자열 나누기
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more.
`;

// 긴 조건문 나누기
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

실무에서 팀원들이 직접 "가로 몇 자로 하자" 논의하는 일은 거의 없다. 유명한 스타일 가이드를 하나 골라서 그대로 따르고(Airbnb는 100자, Google은 80자 등), ESLint + Prettier 같은 도구로 자동 포매팅 설정해두면 저장할 때 알아서 정리된다.

> **Prettier**
>
> 코드 포매터다. 저장하면 들여쓰기, 세미콜론, 따옴표, 줄바꿈 같은 걸 자동으로 맞춰준다.
>
> ```js
> // 저장 전
> function foo(a,b){
> let result=a+b
>     return result}
>
> // Prettier가 자동 정리
> function foo(a, b) {
>   let result = a + b;
>   return result;
> }
> ```
>
> ESLint와 역할이 다르다:
>
> | 도구 | 역할 |
> |------|------|
> | ESLint | 코드 **품질** 검사 (미사용 변수, 잠재적 버그 등) |
> | Prettier | 코드 **포맷** 정리 (들여쓰기, 공백, 줄바꿈 등) |
>
> 실무에서는 둘 다 같이 쓰는 경우가 대부분이다.

### 들여쓰기

들여쓰기에는 두 종류가 있다.

**가로 들여쓰기**: 스페이스 2개 또는 4개. 탭보다 스페이스가 더 유연하다.

**세로 들여쓰기**: 논리 블록 사이에 빈 줄을 넣어 코드를 분리하는 것.

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

변수 선언, 반복문, return문 사이에 빈 줄을 넣었다. 세로 들여쓰기 없이 9줄 이상 연속으로 쓰지 않는 게 좋다.

> **세로 들여쓰기를 빼먹는 경우가 많다**
>
> 가로 들여쓰기는 다들 신경 쓰는데, 세로 들여쓰기는 의외로 간과한다.
> 의미 단위별로 빈 줄 하나 넣어주는 습관을 들이면 가독성이 확 올라간다.

### 세미콜론

모든 구문 끝에 세미콜론을 붙이는 게 좋다. 자동 삽입을 믿다가 줄바꿈이 세미콜론으로 해석되지 않는 경우에 버그가 생길 수 있다. 이건 02-first-steps에서도 다뤘다.

### 중첩 레벨

중첩이 깊어지면 가독성이 급격히 떨어진다. `continue`나 조기 반환으로 줄일 수 있다.

```js
// 중첩이 깊다
for (let i = 0; i < 10; i++) {
  if (cond) {
    // ...
  }
}

// continue로 중첩 제거
for (let i = 0; i < 10; i++) {
  if (!cond) continue;
  // ...
}
```

함수에서도 마찬가지다. else 안에 본문을 넣는 것보다 early return이 낫다.

```js
// else 중첩
function pow(x, n) {
  if (n < 0) {
    alert("음수 불가");
  } else {
    let result = 1;
    for (let i = 0; i < n; i++) {
      result *= x;
    }
    return result;
  }
}

// early return
function pow(x, n) {
  if (n < 0) {
    alert("음수 불가");
    return;
  }

  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
```

특별한 조건을 먼저 처리하고 빠져나오면, 나머지 코드는 추가 중첩 없이 읽을 수 있다.

### 함수의 위치

헬퍼 함수를 여러 개 만들어 쓸 때, 두 가지 배치 방법이 있다.

```js
// 1. 함수 먼저 선언, 사용 코드 나중에
function createElement() { ... }
function setHandler(elem) { ... }

let elem = createElement();
setHandler(elem);
```

```js
// 2. 사용 코드 먼저, 함수는 아래에
let elem = createElement();
setHandler(elem);

// --- 헬퍼 함수 ---
function createElement() { ... }
function setHandler(elem) { ... }
```

대부분 두 번째 방법을 선호한다. 코드를 읽는 사람은 "이게 뭘 하는지"를 먼저 알고 싶어하기 때문이다. 함수 이름이 명확하면 본문을 읽지 않아도 된다. 호이스팅 덕분에 아래에 선언해도 위에서 호출할 수 있다.

### 스타일 가이드

팀 전체가 동일한 스타일 가이드를 따르면 누가 써도 같은 스타일의 코드가 나온다. 요즘은 기존에 만들어진 가이드를 가져다 쓰는 경우가 많다.

유명한 가이드:
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [StandardJS](https://standardjs.com/)

### Linter

코드가 스타일 가이드를 잘 따르고 있는지 자동으로 검사해주는 도구다. 오타 같은 버그도 미리 잡아준다.

> **ESLint**
>
> 가장 많이 쓰이는 linter다. `.eslintrc` 설정 파일로 규칙을 커스터마이징할 수 있다.
>
> ```json
> {
>   "extends": "eslint:recommended",
>   "env": {
>     "browser": true,
>     "node": true,
>     "es6": true
>   },
>   "rules": {
>     "no-console": 0,
>     "indent": ["warning", 2]
>   }
> }
> ```
>
> 에디터 플러그인이랑 연동하면 코드 쓰면서 바로 확인할 수 있다.

설치 순서:
1. Node.js 설치
2. `npm install -g eslint`
3. 프로젝트 루트에 `.eslintrc` 생성
4. 에디터에 ESLint 플러그인 설치

---

## 03-comments: 주석

주석은 코드가 어떻게 동작하는지, 왜 그렇게 동작하는지를 설명하는 데 쓰인다. 근데 좋은 코드에는 "설명이 담긴" 주석이 많으면 안 된다. 코드 자체만으로 이해할 수 있어야 한다.

### 좋지 않은 주석

"이 코드가 뭘 하는지" 설명하는 주석은 대부분 나쁜 주석이다. 주석이 필요하다는 건 코드가 불분명하다는 뜻이니까, 주석을 달 게 아니라 코드를 다시 짜야 할 수도 있다.

#### 함수 분리하기

주석으로 설명하는 대신, 의미 있는 이름의 함수로 분리하면 주석이 필요 없어진다.

```js
// 주석으로 설명하는 코드
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {
    // i가 소수인지를 확인함
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    alert(i);
  }
}

// 함수로 분리한 코드
function showPrimes(n) {
  for (let i = 2; i < n; i++) {
    if (!isPrime(i)) continue;
    alert(i);
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}
```

함수 이름 자체가 주석 역할을 한다. 이런 코드를 **자기 설명적(self-descriptive) 코드**라고 부른다.

> **자기 설명적 코드 (Self-descriptive Code)**
>
> 주석 없이도 코드 자체로 무슨 일을 하는지 알 수 있는 코드.
> 함수 이름, 변수 이름을 잘 지으면 주석이 필요 없어진다.

#### 함수로 묶기

코드가 아래로 죽 늘어져 있을 때, 주석 대신 함수로 묶으면 읽기 편해진다.

```js
// 주석에 의존하는 코드
// 위스키를 더해줌
for (let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// 주스를 더해줌
for (let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}
```

```js
// 함수로 분리한 코드
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for (let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    // ...
  }
}

function addJuice(container) {
  for (let t = 0; t < 3; t++) {
    let tomato = getTomato();
    // ...
  }
}
```

핵심은 **읽는 사람이 선택할 수 있느냐**다. 함수로 분리하면 호출부만 보고 전체 흐름을 파악할 수 있고, 세부 구현은 필요할 때만 확인하면 된다. 주석은 코드를 수정하고 안 고치면 거짓말이 되지만, 함수 이름은 코드 자체니까 동작이 바뀌면 같이 바뀌게 된다.

### 좋은 주석

그러면 언제 주석을 써야 할까?

**아키텍처를 설명하는 주석**: 컴포넌트 간 상호작용, 전체 구조를 조감도처럼 설명할 때.

**함수 용례와 매개변수 정보**: JSDoc 문법으로 작성한다.

```js
/**
 * x를 n번 곱한 수를 반환함
 *
 * @param {number} x 거듭제곱할 숫자
 * @param {number} n 곱할 횟수, 반드시 자연수여야 함
 * @return {number} x의 n 거듭제곱을 반환함
 */
function pow(x, n) {
  // ...
}
```

> **JSDoc**
>
> 함수의 용례, 매개변수, 반환값 정보를 문서화하는 주석 문법이다.
> `@param {타입} 이름 설명` 형식으로 쓴다.
> VS Code 같은 에디터에서 함수 호출 시 자동으로 힌트가 뜬다.
> 다만 TypeScript 프로젝트에서는 타입이 코드 자체에 들어가니까 잘 안 쓴다.

**왜 이 방법을 선택했는지 설명하는 주석**: 이게 제일 중요하다. "무엇을 하는지"가 아니라 "왜 이렇게 했는지"를 적는 거다. 이 주석이 없으면 나중에 누군가(미래의 나 포함)가 "더 좋은 방법"으로 바꾸려다가, 그 방법이 안 되는 이유를 또 겪게 된다.

**직감에 반하는 미묘한 동작**: 코드가 예상과 다르게 동작하는 부분이 있으면 주석을 달아두는 게 좋다.

### 정리

| 좋은 주석 | 나쁜 주석 |
|-----------|-----------|
| 아키텍처 설명 (전체 구조, 조감도) | "이 코드가 뭘 하는지" 설명 |
| 함수 용례, 매개변수 정보 (JSDoc) | 코드를 그대로 한국어로 번역한 주석 |
| 왜 이 방법을 택했는지 (의사결정 기록) | 코드만 봐도 알 수 있는 내용 |
| 직감에 반하는 미묘한 동작 설명 | |

---

## 04-ninja-code: 닌자 코드

"이렇게 하지 마라"를 반어법으로 쓴 챕터다. 전부 나쁜 예시니까 반대로 해야 한다.

### 코드 짧게 쓰기

짧다고 좋은 게 아니다. 읽는 사람이 해석할 수 없으면 의미가 없다.

```js
// 삼항 연산자 중첩 - 해독 불가
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

### 한 글자 변수

`a`, `b`, `c` 같은 이름은 코드에서 검색도 안 되고, 의미도 알 수 없다. 반복문 카운터 `i`, `j` 정도는 관례지만, 그 외에는 의미 있는 이름을 써야 한다.

### 약어 사용

`list` → `lst`, `userAgent` → `ua`, `browser` → `brsr` 같은 축약은 쓰지 말자. 본인만 알아볼 수 있는 이름이다.

### 포괄적인 명사

`data`, `value`, `item`, `elem`, `obj` 같은 이름은 어디에나 붙일 수 있어서 아무 정보도 주지 않는다. `data1`, `item2` 같이 숫자를 붙이는 것도 마찬가지다.

> **불용어 (Stop Word)**
>
> 변수명에서 실질적 의미를 주지 않는 단어들이다.
> `data`, `info`, `value`, `item`, `temp` 등이 해당한다.
> `userData`보다 `user`가 낫고, `priceValue`보다 `price`가 낫다.

### 동의어 사용

같은 동작에 다른 이름을 쓰면 읽는 사람이 "뭔가 다른 건가?" 하고 착각한다.

```js
// 나쁜 예 - 전부 "보여주기"인데 접두어가 제각각
displayMessage();
showName();
renderHeader();
paintButton();

// 좋은 예 - 같은 동작이면 같은 접두어
showMessage();
showName();
showHeader();
showButton();
```

반대로 다른 동작에 같은 이름을 쓰는 것도 문제다. `printPage()`가 프린터 출력이고 `printText()`가 화면 출력이면, `printMessage()`를 봤을 때 뭘 하는지 알 수 없다.

**규칙은 단순하다:**
- 같은 동작 → 같은 이름
- 다른 동작 → 다른 이름

이전에 02-first-steps 함수 파트에서 나온 접두어 규칙(`get`, `calc`, `create`, `check`, `show`)을 팀에서 정해놓고 통일하면 이 문제를 피할 수 있다.

### 이름 재사용

변수를 재사용하면 현재 어떤 값이 들어있는지 추적하기 어려워진다.

```js
// 나쁜 예 - elem이 중간에 바뀜
function ninjaFunction(elem) {
  // elem을 이용한 코드...

  elem = clone(elem);

  // 여기서부터 elem은 복제본
}
```

새 변수를 선언하는 게 낫다. 모던 압축기가 최적화해주니까 변수 하나 더 만든다고 성능 문제 없다.

### 외부 변수 덮어쓰기

함수 내부에서 외부 변수와 같은 이름을 쓰면 어느 쪽인지 헷갈린다.

```js
let user = authenticateUser();

function render() {
  let user = anotherValue();  // 외부 user를 가림
  // ...
}
```

> **변수 가리기 (Shadowing)**
>
> 내부 스코프에서 외부 변수와 같은 이름으로 새 변수를 선언하면,
> 내부에서는 외부 변수에 접근할 수 없게 된다.
> 02-first-steps 함수 파트에서 다뤘던 개념이다.

### 부작용이 있는 코드

`is...`, `check...`, `find...` 같은 이름의 함수는 확인만 하고 외부 상태를 바꾸지 않아야 한다. 함수 이름이 약속한 동작만 수행해야 한다. 이것도 02-first-steps 함수 파트에서 나온 **단일 책임 원칙**과 같은 얘기다.

### 함수에 다양한 기능 넣기

함수 하나는 한 가지 일만 해야 한다. `validateEmail()`이 유효성 검사도 하고 에러 메시지도 띄우고 재입력도 요청하면, 유효성 검사만 필요한 곳에서 재사용할 수 없다.

