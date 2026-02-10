# 04. 객체 기본

## 01-object: 객체

자바스크립트엔 여덟 가지 자료형이 있는데, 일곱 개는 하나의 데이터만 담을 수 있어서 원시형(primitive)이라 부른다. 객체는 다르다. 키로 구분된 데이터 집합이나 복잡한 개체를 저장할 수 있다.

### 객체 생성

```js
let user = {};           // 객체 리터럴 (주로 이걸 씀)
let user = new Object(); // 객체 생성자 문법
```

> **객체 리터럴 (Object Literal)**
>
> 중괄호 `{}`를 이용해 객체를 선언하는 방식이다.
> 거의 대부분 이 방법으로 객체를 만든다.

### 프로퍼티

중괄호 안에 `키: 값` 쌍으로 구성된 데이터를 프로퍼티라고 한다.

```js
let user = {
  name: "John",  // 키: "name", 값: "John"
  age: 30,       // 키: "age", 값: 30
};
```

> **프로퍼티 (Property)**
>
> 객체 안에 저장되는 `키: 값` 쌍이다.
> 키는 문자형(또는 심볼), 값은 모든 자료형이 가능하다.
> 프로퍼티 키는 "프로퍼티 이름"이라고도 부른다.

마지막 프로퍼티 끝에 쉼표를 붙일 수 있다. trailing comma라고 부르는데, 프로퍼티 추가/삭제/이동할 때 편하다.

### 프로퍼티 읽기, 추가, 삭제

```js
// 읽기
alert(user.name); // "John"

// 추가
user.isAdmin = true;

// 삭제
delete user.age;
```

### const 객체는 수정할 수 있다

```js
const user = { name: "John" };

user.name = "Pete"; // 가능!
// user = {};       // 에러! 객체 자체를 재할당하는 건 안 됨
```

`const`는 변수가 가리키는 참조를 고정하는 거지, 객체 내용을 고정하는 게 아니다.

### 대괄호 표기법

키에 공백이나 특수문자가 있으면 점 표기법을 쓸 수 없다. 대괄호 표기법을 써야 한다.

```js
let user = {};

// 점 표기법 - 키가 유효한 변수 식별자일 때
user.name = "John";

// 대괄호 표기법 - 어떤 문자열이든 키로 쓸 수 있음
user["likes birds"] = true;
```

대괄호 표기법은 변수로 키에 접근할 수 있다는 게 큰 장점이다.

```js
let key = "name";

alert(user[key]);  // "John" - 변수로 접근 가능
alert(user.key);   // undefined - "key"라는 문자열 키를 찾음
```

> **점 표기법 vs 대괄호 표기법**
>
> | | 점 표기법 | 대괄호 표기법 |
> |---|---|---|
> | 문법 | `obj.key` | `obj["key"]` |
> | 키 제약 | 유효한 변수 식별자만 | 어떤 문자열이든 가능 |
> | 변수로 접근 | 불가 | 가능 |
>
> 단순한 키면 점 표기법, 복잡하거나 동적이면 대괄호 표기법.

### 계산된 프로퍼티

객체 리터럴 안에서 대괄호로 키를 감싸면, 변수 값을 키로 쓸 수 있다.

```js
let fruit = "apple";

let bag = {
  [fruit]: 5, // fruit 변수의 값 "apple"이 키가 됨
};

alert(bag.apple); // 5
```

> **계산된 프로퍼티 (Computed Property)**
>
> 객체 리터럴에서 `[표현식]`을 키로 사용하는 것이다.
> 대괄호 안의 표현식이 평가된 결과가 프로퍼티 이름이 된다.

### 단축 프로퍼티

변수 이름과 키 이름이 같으면 하나만 써도 된다. 실무에서 엄청 자주 쓴다.

```js
let name = "John";
let age = 30;

// 이거랑
let user = { name: name, age: age };

// 이거랑 같다
let user = { name, age };
```

> **프로퍼티 값 단축 구문 (Property Value Shorthand)**
>
> `name: name`을 `name`으로 줄여 쓸 수 있다.
> 일반 프로퍼티와 단축 프로퍼티를 섞어 쓰는 것도 가능하다.

### 프로퍼티 이름의 제약사항

변수 이름에는 예약어(`for`, `let`, `return` 등)를 쓸 수 없지만, 객체 프로퍼티 키에는 제약이 없다.

```js
let obj = {
  for: 1,
  let: 2,
  return: 3,
};

alert(obj.for + obj.let + obj.return); // 6
```

키에 숫자를 넣으면 문자열로 자동 변환된다. `0` → `"0"`.

### in 연산자로 프로퍼티 존재 여부 확인

존재하지 않는 프로퍼티에 접근하면 에러가 아니라 `undefined`를 반환한다. 이걸로 확인할 수도 있지만, `in` 연산자가 더 정확하다.

```js
let user = { name: "John", age: 30 };

alert("age" in user);    // true
alert("blabla" in user); // false
```

`undefined`와 비교하는 방식은 프로퍼티 값이 실제로 `undefined`일 때 실패한다.

```js
let obj = { test: undefined };

alert(obj.test === undefined); // true - 그런데 프로퍼티는 존재함!
alert("test" in obj);          // true - in은 정확하게 판별
```

실무에서 프로퍼티에 `undefined`를 할당하는 경우는 거의 없다. 비어있음을 표현하려면 `null`을 쓴다.

### for..in 반복문

객체의 모든 키를 순회한다. `for(;;)`과는 완전히 다른 문법이다.

```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  alert(key);        // name, age, isAdmin
  alert(user[key]);  // John, 30, true
}
```

### 객체 정렬 방식

- 정수 프로퍼티: 숫자 순으로 자동 정렬
- 그 외: 추가한 순서대로 정렬

```js
let codes = {
  "49": "독일",
  "41": "스위스",
  "44": "영국",
  "1": "미국",
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49 (숫자 순!)
}
```

> **정수 프로퍼티 (Integer Property)**
>
> 변형 없이 정수로 변환했다가 다시 문자열로 되돌릴 수 있는 키다.
> `"49"` → 정수 프로퍼티 (Number("49") → 49 → String(49) → "49")
> `"+49"` → 정수 프로퍼티 아님 (Number("+49") → 49 → String(49) → "49" ≠ "+49")

추가한 순서대로 나오게 하려면 키를 정수가 아닌 형태로 만들면 된다. `"+49"` 같이 앞에 `+`를 붙이는 트릭을 쓸 수 있다.
