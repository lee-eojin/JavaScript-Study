# 02. First Steps

## 1-hello-world: Hello, world!

`<script>` 태그로 자바스크립트를 HTML에 삽입할 수 있다.

```html
<script>
  alert('Hello, world!');
</script>
```

옛날 코드에서 `type="text/javascript"`나 `language` 속성이 붙어있는 걸 볼 수 있는데, 지금은 필요 없다.

### 외부 스크립트

코드가 길어지면 별도 파일로 분리해서 `src` 속성으로 연결한다.

```html
<script src="/js/script.js"></script>
```

> **주의: src 속성과 내부 코드는 동시에 쓰지 못한다**
>
> ```html
> <script src="file.js">
>   alert(1); // 이 코드는 무시됨
> </script>
> ```
>
> 둘 다 필요하면 `<script>` 태그를 두 개로 분리해야 한다.

> **캐시 이점**
>
> 외부 파일로 분리하면 브라우저가 캐시에 저장해서, 다른 페이지에서 같은 스크립트 쓸 때 다시 다운로드하지 않는다.
> 트래픽 절약 + 페이지 로딩 빨라짐.

---

## 2-structure: 코드 구조

### 세미콜론

문(statement)은 세미콜론으로 구분한다. 줄바꿈이 있으면 세미콜론을 생략할 수 있는데, 자바스크립트가 자동으로 삽입해주기 때문이다.

```js
alert('Hello')
alert('World')
```

하지만 자동 삽입이 안 되는 경우가 있다.

```js
alert("에러가 발생합니다.")

[1, 2].forEach(alert)
```

대괄호 `[` 앞에서는 세미콜론이 자동 삽입되지 않아서, 자바스크립트가 이걸 한 문장으로 해석해버린다.

```js
alert("에러가 발생합니다.")[1, 2].forEach(alert)
```

> **세미콜론은 명시적으로 쓰자**
>
> 자동 삽입을 믿다가 예상치 못한 버그를 만날 수 있다.
> 특히 대괄호나 괄호로 시작하는 줄 앞에서 문제가 생기기 쉽다.
> 그냥 항상 세미콜론 붙이는 습관을 들이면 안전하다.

### 주석

```js
// 한 줄 주석

/*
  여러 줄 주석
*/
```

중첩 주석(`/* /* */ */`)은 지원하지 않는다.

---

## 3-strict-mode: 엄격 모드

ES5에서 기존 기능 일부가 변경됐는데, 하위 호환성 때문에 `"use strict"`를 써야만 활성화되도록 했다.

```js
"use strict";

// 모던한 방식으로 동작
```

- 반드시 스크립트 최상단에 위치해야 한다
- 한번 적용하면 취소할 방법이 없다

> **요즘은 굳이 안 써도 된다**
>
> 클래스와 모듈을 사용하면 `use strict`가 자동으로 적용된다.
> 요즘 코드는 대부분 모듈로 작성하니까, 직접 명시할 일이 별로 없다.

---

## 4-variables: 변수와 상수

### 변수 선언

```js
let message = 'Hello';
const PI = 3.14;
```

- `let`: 모던한 변수 선언
- `const`: 재할당 불가능한 상수
- `var`: 오래된 방식, 쓰지 않는다

같은 변수를 두 번 선언하면 에러가 발생한다.

```js
let message = "This";
let message = "That"; // SyntaxError
```

### 변수 명명 규칙

- 문자, 숫자, `$`, `_`만 사용 가능
- 첫 글자는 숫자가 될 수 없다
- 하이픈(`-`)은 사용 불가
- 예약어(`let`, `class`, `return` 등)는 사용 불가
- 대소문자 구분한다 (`apple` ≠ `AppLE`)

```js
let userName;     // O
let test123;      // O
let 1a;           // X - 숫자로 시작
let my-name;      // X - 하이픈 사용
```

### 대문자 상수

하드코딩된 값의 별칭으로 쓸 때는 대문자와 밑줄로 명명한다.

```js
const COLOR_RED = "#F00";
const COLOR_ORANGE = "#FF7F00";
```

런타임에 계산되는 상수는 일반 방식으로 명명한다.

```js
const pageLoadTime = /* 페이지 로드 시간 */;
```

### 바람직한 변수명

> **변수명 짓기는 프로그래밍에서 가장 중요하고 어려운 기술 중 하나다**
>
> - `userName`, `shoppingCart`처럼 읽을 수 있는 이름 사용
> - `a`, `b`, `c` 같은 짧은 이름 피하기
> - `data`, `value` 같은 불용어 피하기
> - 팀에서 user라고 부르기로 했으면 `currentVisitor`가 아니라 `currentUser`로 통일

> **변수 재사용보다 새로 선언하는 게 낫다**
>
> 기존 변수를 재사용하면 디버깅이 어려워진다.
> 모던 압축기가 최적화를 잘 해주니까 변수 추가해도 성능 문제 없다.

---

## 5-types: 자료형

### 동적 타입 (Dynamically Typed)

자바스크립트는 동적 타입 언어다. 변수에 저장되는 값의 타입이 언제든 바뀔 수 있다.

```js
let message = "hello";
message = 123456; // 에러 없음
```

정적 타입 언어(Java, TypeScript 등)는 변수 선언 시 타입을 지정하고, 다른 타입의 값을 넣으면 에러가 난다.

```java
// Java
String message = "hello";
message = 123456; // 컴파일 에러!
```

동적 타입은 유연하지만, 런타임에 예상치 못한 타입 에러가 발생할 수 있다. 그래서 TypeScript 같은 정적 타입 도구를 쓰기도 한다.

> **컴파일 타임 vs 런타임**
>
> - 컴파일 타임: 코드를 실행하기 전, 변환/검사하는 단계. 정적 타입 언어는 여기서 타입 에러를 잡는다.
> - 런타임: 코드가 실제로 실행되는 시점. 동적 타입 언어는 실행해봐야 타입 에러를 알 수 있다.
>
> 정적 타입은 실행 전에 에러를 잡아주니까 안전하고, 동적 타입은 유연하지만 실행해봐야 문제를 발견한다.

### 8가지 기본 자료형

| 타입 | 설명 | 예시 |
|------|------|------|
| number | 정수, 부동소수점, Infinity, NaN | `123`, `12.345`, `NaN` |
| bigint | 아주 큰 정수 | `1234567890n` |
| string | 문자열 | `"hello"`, `'hello'`, `` `hello` `` |
| boolean | 참/거짓 | `true`, `false` |
| null | 비어있음/알 수 없음 | `null` |
| undefined | 할당되지 않음 | `undefined` |
| object | 복잡한 데이터 구조 | `{}`, `[]` |
| symbol | 고유 식별자 | `Symbol("id")` |

### null vs undefined

- `null`: 의도적으로 "비어있음"을 표현할 때
- `undefined`: 값이 할당되지 않은 상태

```js
let age;
alert(age); // undefined - 할당 안 됨

let user = null; // 의도적으로 비어있음
```

> **undefined를 직접 할당하지 말자**
>
> 비어있음을 표현하고 싶으면 `null`을 쓴다.
> `undefined`는 "할당되지 않은 상태"를 위해 남겨두는 게 좋다.

### typeof 연산자

```js
typeof 0          // "number"
typeof "foo"      // "string"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" ← 언어의 오류!
typeof alert      // "function"
```

> **typeof null === "object"는 버그다**
>
> `null`은 객체가 아니다. 하위 호환성 때문에 수정하지 않고 남겨둔 것.

---

## 6-alert-prompt-confirm: 상호작용

브라우저에서 제공하는 기본 대화상자 함수들이다.

```js
alert("메시지");                    // 메시지 표시
let name = prompt("이름?", "");     // 입력 받기 (취소 시 null)
let ok = confirm("진행할까요?");     // 확인/취소 (true/false)
```

| 함수 | 반환값 | 용도 |
|------|--------|------|
| `alert(msg)` | 없음 | 메시지 표시 |
| `prompt(msg, default)` | 문자열 또는 `null` | 텍스트 입력 받기 |
| `confirm(msg)` | `true` 또는 `false` | 확인/취소 선택 |

> **모달 창**
>
> 이 함수들은 모달 창을 띄운다. 모달이 떠 있는 동안 스크립트 실행이 멈추고,
> 사용자가 창을 닫기 전까지 페이지와 상호작용할 수 없다.
>
> 실전에서는 이 기본 대화상자 대신 직접 만든 커스텀 모달을 쓰는 경우가 많다.
> 모양을 커스터마이징할 수 없고, 브라우저마다 생김새가 다르기 때문이다.
