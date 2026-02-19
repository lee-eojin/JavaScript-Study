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
