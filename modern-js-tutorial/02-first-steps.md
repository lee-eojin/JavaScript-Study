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

---

## 7-type-conversions: 형 변환

형 변환은 데이터 타입이 바뀌는 것이다.

- **암시적 형 변환**: 자바스크립트가 자동으로 변환
- **명시적 형 변환**: 개발자가 `String()`, `Number()`, `Boolean()` 등으로 직접 변환

```js
// 암시적
alert(123);       // 숫자가 문자열로 자동 변환
"6" / "2";        // 문자열이 숫자로 자동 변환 → 3

// 명시적
String(123);      // "123"
Number("123");    // 123
Boolean(1);       // true
```

### boolean과 문자열 "true"는 다르다

```js
let a = true;       // boolean
let b = "true";     // string

typeof a;  // "boolean"
typeof b;  // "string"

a === b;   // false - 타입이 다름
```

따옴표로 감싸면 문자열이 된다. `true`와 `"true"`는 완전히 다른 값이다.

### 숫자형 변환 규칙

| 값 | 변환 결과 |
|---|---|
| `undefined` | `NaN` |
| `null` | `0` |
| `true` / `false` | `1` / `0` |
| 문자열 | 숫자로 읽음, 실패 시 `NaN` |

```js
Number("123");       // 123
Number("123z");      // NaN
Number(null);        // 0
Number(undefined);   // NaN ← 주의!
```

### 불린형 변환 - Falsy와 Truthy

> **Falsy (false로 취급되는 값)**
>
> ```js
> false, 0, "", null, undefined, NaN
> ```
>
> 이 6개만 falsy고, 나머지는 전부 truthy다.

```js
Boolean("");        // false - 빈 문자열
Boolean("0");       // true - 문자가 있음
Boolean("false");   // true - 문자열 "false"는 그냥 글자
Boolean([]);        // true - 빈 배열도 truthy
Boolean({});        // true - 빈 객체도 truthy
```

> **자주 하는 실수**
>
> - `"0"`은 truthy다 (빈 문자열이 아니니까)
> - `" "` 공백 문자열도 truthy다
> - `null`은 숫자로 변환하면 `0`, `undefined`는 `NaN`이다
> - 문자열 `"false"`는 falsy가 아니다 (그냥 글자가 있는 문자열)

---

## 8-operators: 기본 연산자와 수학

### 용어 정리

> **피연산자 (Operand)**
>
> 연산자가 연산을 수행하는 대상. `5 * 2`에서 `5`와 `2`가 피연산자다.

> **단항 연산자 (Unary) vs 이항 연산자 (Binary)**
>
> - 단항: 피연산자 1개 (`-x`, `+x`)
> - 이항: 피연산자 2개 (`a + b`, `a - b`)
>
> 같은 기호라도 단항/이항에 따라 다르게 동작한다.
> ```js
> let x = 1;
> x = -x;      // 단항 - : 부호 반전 → -1
> 5 - 3;       // 이항 - : 뺄셈 → 2
> ```

### 수학 연산자

| 연산자 | 설명 | 예시 |
|---|---|---|
| `+` | 덧셈 | `2 + 3` → 5 |
| `-` | 뺄셈 | `5 - 2` → 3 |
| `*` | 곱셈 | `2 * 3` → 6 |
| `/` | 나눗셈 | `6 / 2` → 3 |
| `%` | 나머지 | `5 % 2` → 1 |
| `**` | 거듭제곱 | `2 ** 3` → 8 |

### 문자열 연결 (+)

`+` 연산자는 피연산자 중 하나가 문자열이면 문자열 연결을 한다.

```js
'1' + 2;       // "12"
2 + '1';       // "21"
2 + 2 + '1';   // "41" (왼쪽부터 계산: 4 + '1')
```

다른 연산자(`-`, `/`, `*`)는 문자열을 숫자로 변환한다.

```js
'6' - '2';     // 4
'6' / '2';     // 3
```

### 단항 + 연산자

숫자가 아닌 값을 숫자로 변환한다. `Number()`와 같은 역할.

```js
+true;         // 1
+"123";        // 123
+"";           // 0
```

### 복합 할당 연산자

```js
let n = 2;
n += 5;   // n = n + 5 → 7
n *= 2;   // n = n * 2 → 14
```

### 증가/감소 연산자

> **전위형 (Prefix) vs 후위형 (Postfix)**
>
> - 전위형 `++counter`: 증가시키고 **새 값** 반환
> - 후위형 `counter++`: 증가시키고 **기존 값** 반환

```js
let a = 1;
let b = ++a;   // a를 먼저 증가 → b = 2, a = 2

let c = 1;
let d = c++;   // 기존 값 반환 후 증가 → d = 1, c = 2
```

> **가독성 주의**
>
> 한 줄에서 증가 연산자를 다른 연산과 섞어 쓰면 읽기 어렵다.
> `alert(2 * counter++)` 같은 코드는 피하고, 줄을 나누는 게 좋다.

---

## 9-comparison: 비교 연산자

비교 연산자는 불린값(`true`/`false`)을 반환한다.

```js
2 > 1;    // true
2 == 1;   // false
2 != 1;   // true
```

### 문자열 비교

문자열은 유니코드 순으로 한 글자씩 비교한다.

> **유니코드 (Unicode)**
>
> 컴퓨터는 숫자만 이해하니까, 문자를 숫자로 대응시키는 표가 필요하다.
> 유니코드는 전 세계 모든 문자를 하나의 표로 만든 것이다.
> ```
> 'A' → 65
> 'a' → 97
> ```
> 소문자가 대문자보다 인덱스가 크다.

```js
'a' > 'A';     // true (97 > 65)
'Bee' > 'Be';  // true (길이가 더 김)
```

### 다른 형 비교

비교할 때 타입이 다르면 **숫자형으로 변환** 후 비교한다.

```js
'2' > 1;       // true ('2' → 2)
true == 1;     // true (true → 1)
false == 0;    // true (false → 0)
```

### == (동등) vs === (일치)

> **동등 연산자 `==`**
>
> 형 변환 후 비교. 타입이 달라도 값이 같으면 true.

> **일치 연산자 `===`**
>
> 형 변환 없이 비교. 타입까지 같아야 true.

```js
0 == false;    // true (둘 다 0으로 변환)
0 === false;   // false (타입이 다름: number vs boolean)

'' == false;   // true
'' === false;  // false
```

**`===`를 쓰는 게 안전하다.** 형 변환으로 인한 예상치 못한 결과를 피할 수 있다.

### null과 undefined 비교

```js
null == undefined;   // true (특별 규칙)
null === undefined;  // false (타입이 다름)
```

> **주의: null과 숫자 비교**
>
> ```js
> null > 0;    // false
> null == 0;   // false
> null >= 0;   // true ← ???
> ```
>
> `>=`, `>` 같은 비교 연산자는 null을 0으로 변환하지만,
> `==`는 null을 변환하지 않는다 (null은 undefined와만 같음).
>
> 결론: **null이나 undefined를 비교 연산자에 넣지 말자.**

---

## 10-ifelse: 조건문과 삼항 연산자

if문 자체는 다른 언어랑 비슷하다. 조건이 true면 실행되고, false면 안 된다.
한 가지 기억할 건 한 줄짜리 코드라도 중괄호 `{}`로 감싸는 게 좋다는 점이다.
나중에 코드 추가할 때 실수할 여지를 줄여준다.

```js
// 이것보다
if (condition) doSomething();

// 이게 낫다
if (condition) {
  doSomething();
}
```

if문 괄호 안에 들어가는 값은 자동으로 불린형으로 변환된다.
앞에서 배운 falsy/truthy 개념이 여기서 쓰인다.
`0`, `""`, `null`, `undefined`, `NaN`은 false로 변환되니까 if문을 통과하지 못한다.

### else if vs 조기 반환

else if로 여러 조건을 처리할 수 있는데, **조기 반환(early return)**이 더 깔끔할 때가 많다.
들여쓰기가 깊어지지 않고 흐름이 명확해진다.

```js
// else if 스타일
function getGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else {
    return 'C';
  }
}

// early return 스타일
function getGrade(score) {
  if (score >= 90) {
    return 'A';
  }
  if (score >= 80) {
    return 'B';
  }
  return 'C';
}
```

> **조기 반환 (Early Return)**
>
> 조건을 만족하면 바로 return해서 함수를 빠져나오는 패턴이다.
> else를 쓰지 않아도 되고, 코드가 위에서 아래로 자연스럽게 읽힌다.
> 중첩 if문 지옥을 피할 수 있다.

### 삼항 연산자

> **삼항 연산자 (Ternary Operator)**
>
> `조건 ? 값1 : 값2` 형태로 쓰는 연산자다.
> 조건이 true면 값1, false면 값2를 반환한다.
> 피연산자가 3개라서 삼항 연산자라고 부른다.

삼항 연산자는 **값을 반환할 때** 쓰는 거다.
근데 짧아 보여도 읽기 불편하고, 중첩되면 더 심해진다.
단순한 경우가 아니면 그냥 if문 쓰는 게 낫다.

```js
// 삼항 연산자 - 짧지만 가독성 별로
let status = age >= 18 ? '성인' : '미성년자';

// if문 - 명확하다
let status;
if (age >= 18) {
  status = '성인';
} else {
  status = '미성년자';
}
```

---

## 11-logical-operators: 논리 연산자

논리 연산자는 `||`(OR), `&&`(AND), `!`(NOT) 세 가지다.
여기서 중요한 건 자바스크립트의 논리 연산자가 **불린값이 아니라 원래 값을 반환**한다는 점이다.

### || (OR)

하나라도 true면 true. 근데 자바스크립트에서는 **첫 번째 truthy 값을 반환**한다.
전부 falsy면 마지막 값을 반환한다.

```js
1 || 0;                // 1 (첫 번째 truthy)
null || undefined || 0; // 0 (전부 falsy, 마지막 값)
```

이걸 이용해서 기본값 설정을 많이 한다.

```js
let name = userName || "익명";
```

> **단락 평가 (Short-circuit Evaluation)**
>
> OR은 truthy를 만나면 거기서 평가를 멈춘다. 뒤에 있는 표현식은 아예 실행되지 않는다.
> ```js
> true || alert("실행 안 됨");
> false || alert("실행됨");
> ```

### && (AND)

둘 다 true여야 true. **첫 번째 falsy 값을 반환**한다.
전부 truthy면 마지막 값을 반환한다.

```js
1 && 0;           // 0 (첫 번째 falsy)
1 && 2 && 3;      // 3 (전부 truthy, 마지막 값)
null && 5;        // null (첫 번째 falsy)
```

> **연산자 우선순위**
>
> `&&`가 `||`보다 우선순위가 높다.
> `a && b || c && d`는 `(a && b) || (c && d)`로 동작한다.

### ! (NOT)

불린형으로 변환한 뒤 반대로 뒤집는다.

```js
!true;   // false
!0;      // true
```

`!!`를 쓰면 불린형으로 변환할 수 있다. `Boolean()`과 같은 효과.

```js
!!"hello";  // true
!!null;     // false
```

> **NOT의 우선순위**
>
> `!`는 모든 논리 연산자 중 가장 높은 우선순위를 가진다.
> `&&`, `||`보다 먼저 실행된다.

### 논리 연산자로 if 대체하지 말자

```js
// 이렇게 쓰지 말자
x > 0 && alert('양수');

// 이게 낫다
if (x > 0) {
  alert('양수');
}
```

`&&`로 조건문 흉내 내면 코드가 짧아 보이지만, 의도가 불명확해진다.
논리 연산자는 값을 다룰 때 쓰고, 분기 처리는 if문을 쓰자.

---

## 12-nullish-coalescing-operator: nullish 병합 연산자 (??)

`??`는 `null`이나 `undefined`일 때만 오른쪽 값을 반환한다.

```js
a ?? b
// a가 null도 아니고 undefined도 아니면 a
// 그 외에는 b
```

### || 와의 차이

이게 핵심이다. `||`는 **첫 번째 truthy**를 반환하고, `??`는 **첫 번째 정의된 값**을 반환한다.

```js
let height = 0;

height || 100;  // 100 (0은 falsy니까)
height ?? 100;  // 0 (0은 null/undefined가 아니니까)
```

`0`이 유효한 값인 경우에 `||`를 쓰면 의도치 않게 기본값으로 덮어씌워진다.
높이, 개수, 인덱스처럼 `0`이 의미 있는 값일 때는 `??`를 써야 한다.

> **언제 뭘 쓸까?**
>
> - `||`: falsy 전체(`0`, `""`, `false`, `null`, `undefined`, `NaN`)를 걸러내고 싶을 때
> - `??`: 오직 `null`과 `undefined`만 걸러내고 싶을 때

### 주의사항

우선순위가 낮아서 복잡한 표현식에서는 괄호가 필요하다.

```js
let area = (height ?? 100) * (width ?? 50);  // 괄호 필수
```

그리고 `&&`, `||`와 직접 섞어 쓰면 문법 에러가 난다.

```js
let x = 1 && 2 ?? 3;      // SyntaxError
let x = (1 && 2) ?? 3;    // OK, 2
```

---

## 13-while-for: 반복문

반복문은 같은 코드를 여러 번 실행할 때 쓴다. 자바스크립트에는 `while`, `do...while`, `for` 세 종류가 있다.

> **이터레이션 (Iteration)**
>
> 반복문 본문이 한 번 실행되는 것을 이터레이션이라고 부른다.
> `for (let i = 0; i < 3; i++)`는 3번의 이터레이션을 수행한다.

### while

조건이 truthy인 동안 계속 실행된다.

```js
let i = 0;
while (i < 3) {
  console.log(i);  // 0, 1, 2
  i++;
}
```

조건에는 어떤 표현식이든 올 수 있다. `while (i)`처럼 쓰면 `i`가 0이 될 때 falsy가 되어 멈춘다.

### do...while

**최소 한 번은 실행**하고, 그 다음부터 조건을 확인한다.

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
```

조건과 상관없이 일단 한 번은 실행해야 할 때 쓴다. 근데 실제로는 `while`을 훨씬 많이 쓴다.

### for

가장 많이 쓰는 반복문이다.

```js
for (begin; condition; step) {
  // 본문
}
```

실행 순서:
1. `begin` 실행 (최초 1회)
2. `condition` 확인 → false면 종료
3. `body` 실행
4. `step` 실행
5. 2번으로 돌아감

```js
for (let i = 0; i < 3; i++) {
  console.log(i);  // 0, 1, 2
}
```

> **인라인 변수 선언**
>
> `for (let i = 0; ...)` 처럼 반복문 안에서 선언한 변수는 반복문 안에서만 접근할 수 있다.
> ```js
> for (let i = 0; i < 3; i++) {
>   console.log(i);
> }
> console.log(i);  // Error: i is not defined
> ```

구성 요소는 생략할 수 있다. 단, 세미콜론 두 개는 필수다.

```js
let i = 0;
for (; i < 3; i++) { }     // begin 생략

for (; i < 3;) { i++; }    // begin, step 생략 (while과 동일)

for (;;) { }               // 전부 생략 → 무한 반복
```

### break

반복문을 즉시 빠져나온다.

```js
let sum = 0;
while (true) {
  let value = +prompt("숫자 입력", '');
  if (!value) break;  // 입력 없으면 탈출
  sum += value;
}
```

조건을 본문 중간에서 확인해야 할 때 `무한 반복문 + break` 조합을 쓴다.

### continue

현재 이터레이션을 중단하고 다음 이터레이션으로 넘어간다.

```js
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;  // 짝수면 스킵
  console.log(i);  // 1, 3, 5, 7, 9
}
```

> **continue로 중첩 줄이기**
>
> ```js
> // 이것보다
> for (let i = 0; i < 10; i++) {
>   if (i % 2) {
>     console.log(i);
>   }
> }
>
> // 이게 낫다
> for (let i = 0; i < 10; i++) {
>   if (i % 2 === 0) continue;
>   console.log(i);
> }
> ```
>
> 조건에 맞지 않으면 빨리 넘기고, 본문은 들여쓰기 없이 작성할 수 있다.
> early return과 같은 맥락이다.

### 레이블 (Label)

중첩 반복문을 한 번에 빠져나올 때 쓴다.

```js
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (!input) break outer;  // 바깥 반복문까지 탈출
  }
}
```

> **레이블 (Label)**
>
> 반복문 앞에 `이름:` 형태로 붙이는 식별자다.
> `break 레이블명` 또는 `continue 레이블명`으로 해당 반복문을 제어할 수 있다.
> 중첩 반복문을 빠져나오는 유일한 방법이다.

`continue`와 레이블을 같이 쓰면 해당 반복문의 다음 이터레이션으로 넘어간다.

### 주의사항

삼항 연산자에 `break`나 `continue`를 쓰면 문법 에러다.

```js
// 이렇게 쓰면 안 된다
(i > 5) ? alert(i) : continue;  // SyntaxError
```

삼항 연산자는 값을 반환하는 표현식이고, `break`/`continue`는 문(statement)이기 때문이다.

### 정리

| 반복문 | 조건 확인 시점 | 특징 |
|--------|---------------|------|
| `while` | 반복 시작 전 | 기본 반복문 |
| `do...while` | 반복 종료 후 | 최소 1회 실행 보장 |
| `for` | 반복 시작 전 | 카운터 변수 관리에 편리 |

| 지시자 | 역할 |
|--------|------|
| `break` | 반복문 즉시 탈출 |
| `continue` | 현재 이터레이션 스킵, 다음으로 |
| `break 레이블` | 해당 레이블의 반복문 탈출 |
| `continue 레이블` | 해당 레이블의 다음 이터레이션으로 |

---

## 14-switch: switch문

여러 개의 if-else if 조건문을 대체할 수 있다. 특정 값에 따라 분기할 때 가독성이 좋다.

```js
switch (x) {
  case 'value1':
    // x === 'value1'일 때 실행
    break;
  case 'value2':
    // x === 'value2'일 때 실행
    break;
  default:
    // 일치하는 case 없을 때 실행
}
```

### break를 빼먹으면 안 된다

`break`가 없으면 조건에 상관없이 다음 case도 계속 실행된다.

```js
let a = 4;
switch (a) {
  case 4:
    console.log('4입니다');   // 실행됨
  case 5:
    console.log('5입니다');   // 이것도 실행됨!
  default:
    console.log('default');   // 이것도 실행됨!
}
```

> **fall-through**
>
> break 없이 다음 case로 넘어가는 현상을 fall-through라고 한다.
> 의도적으로 쓰는 경우도 있지만, 대부분은 실수다.

### case 묶기

같은 코드를 실행할 case는 묶을 수 있다. fall-through를 의도적으로 활용하는 경우다.

```js
switch (fruit) {
  case 'apple':
  case 'banana':
    console.log('과일입니다');
    break;
  case 'carrot':
    console.log('채소입니다');
    break;
}
```

### 일치 비교 (===)를 사용한다

switch문은 `===`로 비교한다. 타입이 다르면 일치하지 않는다.

```js
let input = prompt("값 입력");  // 문자열 반환

switch (input) {
  case 3:   // input은 문자열, 3은 숫자
    console.log('절대 실행 안 됨');
    break;
  case '3':  // 둘 다 문자열
    console.log('이게 실행됨');
    break;
}
```

> **주의**
>
> `prompt()`는 항상 문자열을 반환한다.
> 숫자와 비교하려면 case에도 문자열을 쓰거나, 입력값을 숫자로 변환해야 한다.
