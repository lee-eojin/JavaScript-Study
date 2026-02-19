# 05. 자료형 (1)

## 01-primitives-methods: 원시값의 메서드

원시값(문자열, 숫자 등)은 객체가 아닌데도 메서드를 호출할 수 있다.

```js
let str = "Hello";
alert(str.toUpperCase()); // "HELLO"

let n = 1.23456;
alert(n.toFixed(2)); // "1.23"
```

### 래퍼 객체

내부적으로 이런 일이 일어난다.

1. 원시값의 메서드에 접근하는 순간, 임시 래퍼 객체가 만들어진다
2. 메서드가 실행되고 결과를 반환한다
3. 래퍼 객체는 바로 파괴되고, 원시값만 남는다

> 래퍼 객체 (Object Wrapper)
>
> 원시값이 메서드를 쓸 수 있도록 임시로 만들어지는 객체다.
> 원시 타입에 따라 `String`, `Number`, `Boolean`, `Symbol`이 있다.
> 메서드 호출이 끝나면 바로 사라진다.

`new String()`, `new Number()` 같은 걸로 직접 래퍼 객체를 만들 수 있긴 한데, 쓰지 않는다. `typeof`가 `"object"`가 돼버려서 혼란만 생긴다.

```js
typeof 0;              // "number"
typeof new Number(0);  // "object" - 쓰지 말 것
```

`new` 없이 `Number("123")`, `String(123)` 이렇게 쓰는 건 괜찮다. 형 변환 용도다.

`null`과 `undefined`는 래퍼 객체가 없다. 메서드도 없다.

---

## 02-number: 숫자형

자바스크립트의 일반적인 숫자는 64비트 부동소수점(IEEE-754) 형식으로 저장된다.

### 숫자 입력 방법

`e`를 붙이면 0을 많이 쓰지 않아도 된다.

```js
let billion = 1e9;  // 10억 (1 * 10^9)
let ms = 1e-6;      // 0.000001 (1 / 10^6)
```

16진수, 2진수, 8진수도 지원한다.

```js
alert(0xff);        // 255 (16진수)
alert(0b11111111);  // 255 (2진수)
alert(0o377);       // 255 (8진수)
```

### toString(base)

숫자를 원하는 진법의 문자열로 변환한다.

```js
let num = 255;

alert(num.toString(16)); // "ff"
alert(num.toString(2));  // "11111111"
```

숫자에 직접 호출하려면 점을 두 개 써야 한다. 점 하나면 소수점으로 인식한다.

```js
alert(123456..toString(36)); // "2n9c"
alert((123456).toString(36)); // 괄호로 감싸도 됨
```

### 어림수 (Rounding)

| 메서드 | 영어 | 동작 | 3.1 | 3.6 | -1.1 |
|---|---|---|---|---|---|
| `Math.floor` | floor (바닥) | 내림 | 3 | 3 | -2 |
| `Math.ceil` | ceiling (천장) | 올림 | 4 | 4 | -1 |
| `Math.round` | round (반올림) | 반올림 | 3 | 4 | -1 |
| `Math.trunc` | truncate (자르다) | 소수부 버림 | 3 | 3 | -1 |

소수점 n번째 자리까지 남기려면 `toFixed`를 쓴다. 실무에서 가장 많이 쓰는 방식이다.

```js
let num = 12.456;
alert(num.toFixed(2)); // "12.46" - 반올림됨
```

`toFixed`는 문자열을 반환한다. 숫자로 바꾸려면 앞에 `+`를 붙이면 된다.

```js
let result = +num.toFixed(2); // 12.46 (숫자형)
```

> toFixed(n)
>
> 소수점 n번째 자리까지 어림수를 구한 뒤 문자열로 반환한다.
> `Math.round`와 유사하게 반올림한다.
> 소수부 길이가 n보다 작으면 끝에 0을 채운다. (`12.3.toFixed(5)` → `"12.30000"`)

### 부정확한 계산

```js
alert(0.1 + 0.2 == 0.3); // false!
alert(0.1 + 0.2);         // 0.30000000000000004
```

`0.1`이나 `0.2`는 2진법으로 표현하면 무한 소수가 된다. 64비트 안에 담다 보면 미세한 정밀도 손실이 생긴다. 자바스크립트만의 문제가 아니라 IEEE-754를 쓰는 모든 언어(Java, C, Ruby 등)에서 동일하다.

해결 방법은 `toFixed`로 어림수를 만드는 것이다.

```js
let sum = 0.1 + 0.2;
alert(+sum.toFixed(2)); // 0.3
```

### isNaN과 isFinite

```js
alert(isNaN(NaN));     // true
alert(isNaN("str"));   // true
alert(NaN === NaN);    // false - NaN은 자기 자신과도 같지 않다!

alert(isFinite("15"));      // true - 일반 숫자
alert(isFinite("str"));     // false - NaN
alert(isFinite(Infinity));  // false
```

> isNaN / isFinite
>
> `isNaN(value)` — 값을 숫자로 변환한 뒤 NaN인지 확인한다. `=== NaN`이 안 되기 때문에 필요하다.
> `isFinite(value)` — 값이 일반 숫자인지 확인한다. NaN, Infinity, -Infinity가 아니면 `true`.

### parseInt와 parseFloat

문자열에서 숫자만 읽어낸다. 읽을 수 없는 문자를 만나면 거기서 멈춘다.

```js
alert(parseInt("100px"));    // 100
alert(parseFloat("12.5em")); // 12.5
alert(parseInt("12.3"));     // 12 - 정수만
alert(parseInt("a123"));     // NaN - 첫 글자가 숫자가 아님
```

`Number()`나 `+`는 엄격해서 `"100px"` 같은 건 `NaN`이 되지만, `parseInt`는 숫자 부분만 뽑아준다.

```js
+"100px"          // NaN
parseInt("100px") // 100
```

### 기타 Math 메서드

```js
Math.random()      // 0 이상 1 미만 난수
Math.max(3, 5, 1)  // 5
Math.min(3, 5, 1)  // 1
Math.pow(2, 10)    // 1024 (2의 10제곱)
```
