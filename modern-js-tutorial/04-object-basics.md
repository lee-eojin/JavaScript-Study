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

---

## 02-object-copy: 참조에 의한 객체 복사

### 원시값 vs 객체의 복사 방식

원시값은 값 자체가 복사된다. 각각 독립적이다.

```js
let a = "Hello";
let b = a;

b = "Bye";
alert(a); // "Hello" - 안 바뀜
```

객체는 다르다. 변수에 객체가 통째로 들어가는 게 아니라, 객체가 있는 **메모리 주소(참조)**가 저장된다.

```js
let user = { name: "John" };
let admin = user; // 참조값을 복사
```

> **참조 (Reference)**
>
> 객체가 저장된 메모리 주소다.
> 비유하면 객체는 집이고, 변수는 집 주소가 적힌 메모지다.
> `let admin = user`는 같은 주소를 메모지 하나 더 복사하는 것.
> 메모지가 두 장이지만 가리키는 집은 하나다.

변수가 두 개지만 같은 객체를 가리키니까, 한쪽에서 바꾸면 다른 쪽에서도 보인다.

```js
admin.name = "Pete";
alert(user.name); // "Pete" - 같은 객체니까
```

### 참조에 의한 비교

객체 비교는 같은 객체를 가리키는지를 본다. 내용이 같아도 다른 객체면 `false`다.

```js
let a = {};
let b = a;
alert(a == b);  // true - 같은 객체

let c = {};
let d = {};
alert(c == d);  // false - 내용은 같지만 다른 객체
```

### 객체 복사 - Object.assign

독립적인 복사본을 만들고 싶을 때 쓴다.

```js
let user = { name: "John", age: 30 };

// 빈 객체 {}에 user의 프로퍼티를 전부 복사
let clone = Object.assign({}, user);

clone.name = "Pete";
alert(user.name); // "John" - 원본 안 바뀜
```

> **Object.assign(목표, 원본1, 원본2, ...)**
>
> 원본 객체들의 프로퍼티를 목표 객체에 복사한다. 목표 객체를 반환한다.
> 키가 겹치면 뒤에 오는 값이 덮어쓴다.

병합에도 쓸 수 있다.

```js
let user = { name: "John" };
let perm1 = { canView: true };
let perm2 = { canEdit: true };

Object.assign(user, perm1, perm2);
// user = { name: "John", canView: true, canEdit: true }
```

요즘은 `Object.assign`보다 **스프레드 문법(`...`)**을 더 많이 쓴다. 같은 결과인데 더 짧다.

```js
let clone = { ...user };
let merged = { ...user, ...perm1, ...perm2 };
```

스프레드 문법은 나중에 따로 나온다.

### 얕은 복사 vs 깊은 복사

`Object.assign`이나 스프레드 문법은 **얕은 복사(shallow copy)**다. 프로퍼티 값이 객체인 경우, 그 객체의 참조만 복사된다.

```js
let user = {
  name: "John",
  sizes: { height: 182, width: 50 },
};

let clone = { ...user };

user.sizes.width++;
alert(clone.sizes.width); // 51 - 같은 sizes 객체를 공유하고 있다!
```

> **얕은 복사 (Shallow Copy) vs 깊은 복사 (Deep Copy)**
>
> | | 얕은 복사 | 깊은 복사 |
> |---|---|---|
> | 1단계 프로퍼티 | 독립 복사 | 독립 복사 |
> | 중첩 객체 | 참조 공유 | 전부 독립 복사 |
> | 방법 | `Object.assign`, `{ ...obj }` | `structuredClone()`, lodash `_.cloneDeep()` |

중첩 객체까지 완전히 독립적으로 복사하려면 깊은 복사가 필요하다.

---

## 03-garbage-collection: 가비지 컬렉션

자바스크립트는 메모리 관리를 자동으로 해준다. 개발자가 직접 메모리를 할당하거나 해제할 필요가 없다. 대신 엔진이 알아서 쓸모없어진 것을 찾아내 삭제한다.

### 도달 가능성

가비지 컬렉션의 핵심 기준은 도달 가능성(reachability)이다. 어떻게든 접근하거나 사용할 수 있는 값은 메모리에 남고, 접근할 수 없는 값은 삭제된다.

> **도달 가능성 (Reachability)**
>
> 루트에서 참조를 따라가며 도달할 수 있는 상태를 말한다.
> 도달 가능한 값은 메모리에 유지되고, 도달 불가능한 값은 가비지 컬렉터가 삭제한다.

태생부터 도달 가능한 값들을 루트(root)라고 부른다.

- 전역 변수 (Global Variable)
- 현재 함수의 지역 변수와 매개변수 (Local Variable, Parameter)
- 중첩 함수 체인에서 사용되는 변수와 매개변수

> **변수 종류 정리**
>
> | 종류 | 영어 | 설명 |
> |---|---|---|
> | 전역 변수 | Global Variable | 함수 바깥에 선언된 변수. 어디서든 접근 가능 |
> | 지역 변수 | Local Variable | 함수 안에서 선언된 변수. 그 함수 안에서만 접근 가능 |
> | 매개변수 | Parameter | 함수 선언 시 괄호 안에 적는 변수. 호출할 때 넘긴 값이 들어옴 |
> | 인수 | Argument | 함수를 호출할 때 실제로 넘기는 값 |

루트가 참조하는 값, 그리고 그 값이 또 참조하는 값... 이렇게 체이닝으로 연결된 것들은 전부 도달 가능하다.

### 간단한 예시

```js
let user = { name: "John" };
```

전역 변수 `user`가 `{ name: "John" }` 객체를 참조하고 있다. 도달 가능하다.

```js
user = null;
```

`user`를 `null`로 덮어쓰면 참조가 사라진다. `{ name: "John" }` 객체에 접근할 방법이 없으니 가비지 컬렉터가 삭제한다.

### 참조가 두 개일 때

```js
let user = { name: "John" };
let admin = user; // 같은 객체를 참조

user = null; // user 참조 제거
// admin이 여전히 참조하고 있으므로 객체는 살아있다
```

참조가 하나라도 남아있으면 삭제되지 않는다. `admin`까지 `null`로 바꿔야 비로소 삭제된다.

### 연결된 객체

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({ name: "John" }, { name: "Ann" });
```

이 코드의 실행 흐름을 보면:

1. `{ name: "John" }`과 `{ name: "Ann" }` 객체가 만들어진다
2. `marry(...)` 호출 → 함수 안으로 점프. `let family = ...`는 아직 기다리는 중
3. 함수 안에서 두 객체를 서로 연결(husband/wife)
4. `return`으로 새 객체를 만들어서 호출한 곳으로 돌려보냄
5. `family`에 `{ father: man, mother: woman }`이 담긴다

> **return의 의미**
>
> "돌아가다"라는 뜻이다. 함수를 호출하면 실행 흐름이 함수 안으로 들어갔다가,
> `return`을 만나면 호출한 줄로 돌아온다. `return` 뒤의 값을 들고 돌아간다.
> `return`이 없으면 호출한 쪽에 `undefined`가 돌아간다.

이제 모든 객체가 서로 물려 있는 상태다. 여기서 참조 두 개를 지우면:

```js
delete family.father;
delete family.mother.husband;
```

John으로 들어오는 참조가 전부 사라진다. 외부에서 들어오는 참조만이 도달 가능성에 영향을 준다. John이 wife를 참조하고 있어도(나가는 참조), 아무도 John을 참조하지 않으면 삭제된다.

### 도달할 수 없는 섬

```js
family = null;
```

`family`를 `null`로 바꾸면 루트와의 연결이 끊긴다. John과 Ann이 서로를 참조하고 있어도, 루트에서 도달할 수 없으면 둘 다 삭제된다.

서로 참조한다고 살아남는 게 아니다. 루트에서 도달할 수 있는지가 기준이다.

### mark-and-sweep 알고리즘

가비지 컬렉터의 기본 알고리즘이다.

1. 루트를 mark(표시)한다
2. 루트가 참조하는 객체를 방문하고 mark한다
3. mark된 객체가 참조하는 객체도 방문하고 mark한다
4. 도달 가능한 모든 객체를 방문할 때까지 반복한다
5. mark되지 않은 객체를 메모리에서 삭제한다

> **mark-and-sweep**
>
> 루트에서 시작해 참조를 따라가며 도달 가능한 객체에 표시(mark)를 남기고,
> 표시가 없는 객체를 쓸어버리는(sweep) 알고리즘이다.
> 루트에서 페인트를 들이붓는다고 상상하면 된다. 페인트가 안 묻은 객체는 삭제.

### 최적화 기법

실제 엔진은 기본 알고리즘에 여러 최적화를 더한다.

| 기법 | 설명 |
|---|---|
| 세대별 수집 (Generational) | 새로운 객체와 오래된 객체를 나눠서 관리. 새 객체는 금방 쓸모없어지는 경우가 많아 공격적으로 제거 |
| 점진적 수집 (Incremental) | 한 번에 다 처리하지 않고 여러 번에 나눠서 처리. 긴 지연을 짧은 지연 여러 개로 분산 |
| 유휴 시간 수집 (Idle-time) | CPU가 놀고 있을 때만 가비지 컬렉션 실행. 실행 속도에 영향을 최소화 |

### 핵심 정리

- 가비지 컬렉션은 엔진이 자동으로 수행한다. 개발자가 강제하거나 막을 수 없다
- 도달 가능한 상태일 때 메모리에 남는다
- 참조가 있다고 도달 가능한 게 아니다. 루트에서 접근할 수 있어야 한다 (도달할 수 없는 섬)

---

## 04-object-methods: 메서드와 this

객체는 데이터만 저장하는 게 아니라 행동도 할 수 있다. 프로퍼티 값에 함수를 넣으면 된다.

### 메서드

객체 프로퍼티에 할당된 함수를 메서드라고 부른다.

```js
let user = {
  name: "John",
};

// 프로퍼티에 함수 할당 → 메서드
user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // "안녕하세요!"
```

이미 선언된 함수를 메서드로 등록할 수도 있다.

```js
function sayHi() {
  alert("안녕하세요!");
}

user.sayHi = sayHi;
user.sayHi(); // "안녕하세요!"
```

> 메서드 (Method)
>
> 객체 프로퍼티에 저장된 함수다.
> 프로퍼티 값이 문자열이면 그냥 프로퍼티, 함수면 메서드라고 부른다.

### 메서드 단축 구문

객체 리터럴 안에서 `function`을 생략할 수 있다. 실무에서 거의 이 방식을 쓴다.

```js
// 이거랑
let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 이거랑 같다
let user = {
  sayHi() {
    alert("Hello");
  }
};
```

### this

메서드 안에서 객체 자신에 접근하려면 `this`를 쓴다. `this`는 메서드를 호출한 객체, 즉 점(.) 앞의 객체를 가리킨다.

```js
let user = {
  name: "John",

  sayHi() {
    alert(this.name); // "John"
  }
};

user.sayHi(); // this = user
```

> this
>
> 메서드를 호출한 객체를 가리키는 키워드다.
> `obj.method()` 형태로 호출하면 `this`는 `obj`가 된다.
> 런타임에 결정되기 때문에, 같은 함수라도 어떤 객체에서 호출하느냐에 따라 달라진다.

### this를 안 쓰고 외부 변수를 쓰면 위험하다

```js
let user = {
  name: "John",

  sayHi() {
    alert(user.name); // this 대신 user를 직접 씀
  }
};

let admin = user;
user = null;

admin.sayHi(); // Error! user가 null이니까
```

`this.name`을 썼으면 에러가 안 났다. `this`는 호출한 객체(`admin`)를 가리키니까.

### 자유로운 this

자바스크립트의 `this`는 런타임에 결정된다. 같은 함수라도 어떤 객체에서 호출하느냐에 따라 `this`가 달라진다.

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert(this.name);
}

user.f = sayHi;
admin.f = sayHi;

user.f();  // "John" (this == user)
admin.f(); // "Admin" (this == admin)
```

점 앞에 아무것도 없이 그냥 `sayHi()`로 호출하면 엄격 모드에서 `this`는 `undefined`다.

### 화살표 함수의 this

화살표 함수는 자기만의 `this`가 없다. `this`를 쓰면 바깥 함수의 `this`를 가져다 쓴다.

```js
let user = {
  name: "John",

  sayHi() {
    // 화살표 함수 - 바깥 sayHi의 this를 그대로 씀
    let arrow = () => alert(this.name);
    arrow(); // "John"

    // 일반 함수 - 자기만의 this가 생김
    let regular = function() {
      alert(this.name); // undefined (점 앞에 아무것도 없으니까)
    };
    regular();
  }
};

user.sayHi();
```

> 화살표 함수와 this
>
> | | 일반 함수 | 화살표 함수 |
> |---|---|---|
> | this | 호출 방식에 따라 결정 (점 앞의 객체) | 자기 this 없음. 바깥 함수의 this를 가져옴 |
>
> 메서드 안에서 콜백을 쓸 때 화살표 함수가 편하다. 바깥의 `this`를 알아서 가져다 쓰니까.

---

## 06-constructor-new: new 연산자와 생성자 함수

유사한 객체를 여러 개 만들어야 할 때, 객체 리터럴로 일일이 만들면 번거롭다. 생성자 함수와 `new`를 쓰면 간단하게 찍어낼 수 있다.

### 생성자 함수

생성자 함수는 일반 함수랑 기술적으로 차이가 없다. 두 가지 관례만 따른다.

1. 함수 이름 첫 글자를 대문자로 쓴다
2. 반드시 `new` 연산자를 붙여 호출한다

```js
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("보라");

alert(user.name);    // "보라"
alert(user.isAdmin); // false
```

> 생성자 함수 (Constructor Function)
>
> `new`와 함께 호출하면 내부에서 자동으로 빈 객체를 만들고 `this`에 할당한 뒤, 마지막에 `this`를 반환하는 함수다.
> 함수 자체가 특별한 게 아니라, `new`를 붙이느냐 안 붙이느냐에 따라 엔진이 다르게 처리하는 것이다.

### new의 동작 원리

`new User("보라")`를 호출하면 엔진이 이렇게 처리한다.

```js
function User(name) {
  // 1. this = {} (빈 객체가 암시적으로 만들어짐)

  // 2. 함수 본문 실행 - this에 프로퍼티 추가
  this.name = name;
  this.isAdmin = false;

  // 3. return this (암시적으로 반환)
}
```

결과적으로 아래 코드와 동일하다.

```js
let user = {
  name: "보라",
  isAdmin: false
};
```

같은 구조의 객체가 필요할 때마다 `new User("호진")`, `new User("지민")` 이렇게 찍어내면 된다.

### 같은 함수인데 new 유무에 따라 달라진다

```js
function User(name) {
  this.name = name;
}

let user = new User("John");  // 생성자로 동작 - this = {} 만들고 반환
let result = User("John");    // 일반 함수로 동작 - this = undefined (엄격 모드)
```

함수 자체가 생성자인 게 아니라, `new`를 붙이면 생성자로 동작하는 거다. 그래서 첫 글자를 대문자로 쓰는 관례가 중요하다. `new`를 붙여야 하는 함수라는 걸 사람이 알아볼 수 있게.

### 생성자와 return

생성자 함수에는 보통 `return`이 없다. `this`가 자동 반환되니까. 만약 `return`이 있으면:

- 객체를 `return` → `this` 대신 그 객체가 반환됨
- 원시형을 `return` → 무시됨 (그냥 `this` 반환)

```js
function BigUser() {
  this.name = "원숭이";
  return { name: "고릴라" }; // 객체를 반환 → this 무시
}
alert(new BigUser().name); // "고릴라"

function SmallUser() {
  this.name = "원숭이";
  return; // 원시형 → 무시, this 반환
}
alert(new SmallUser().name); // "원숭이"
```

### 생성자 내 메서드

프로퍼티만 넣는 게 아니라 메서드도 넣을 수 있다.

```js
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert("제 이름은 " + this.name + "입니다.");
  };
}

let bora = new User("이보라");
bora.sayHi(); // "제 이름은 이보라입니다."
```

나중에 배울 `class` 문법으로도 같은 걸 할 수 있다. `class`는 생성자 함수를 더 깔끔하게 쓸 수 있는 문법이다.

---

## 07-optional-chaining: 옵셔널 체이닝 ?.

중첩 객체의 프로퍼티에 접근할 때, 중간에 값이 없으면 에러가 난다. `?.`을 쓰면 에러 없이 안전하게 접근할 수 있다.

### 문제 상황

```js
let user = {}; // address가 없는 사용자

alert(user.address.street); // Error! user.address가 undefined인데 .street를 읽으려 함
```

`?.` 이전에는 `&&`로 일일이 확인해야 했다.

```js
alert(user && user.address && user.address.street); // undefined, 에러 안 남
```

### 옵셔널 체이닝

`?.` 앞의 값이 `null`이나 `undefined`면 평가를 멈추고 `undefined`를 반환한다.

```js
let user = {};

alert(user?.address?.street); // undefined - 에러 안 남
```

```js
let user = null;

alert(user?.address); // undefined
```

> 옵셔널 체이닝 (Optional Chaining)
>
> `?.` 앞의 평가 대상이 `null`이나 `undefined`면 평가를 멈추고 `undefined`를 반환하는 문법이다.
> 중첩 객체에서 중간 값이 없을 수 있을 때 안전하게 접근할 수 있다.

### 남용 금지

`?.`는 없어도 괜찮은 대상에만 써야 한다. 반드시 있어야 하는 값에 `?.`를 쓰면 에러를 조기에 발견하지 못해 디버깅이 어려워진다.

```js
// user는 반드시 있어야 하고, address는 없을 수도 있는 상황
user.address?.street    // 좋음 - user는 확실히 있으니까 에러 잡을 수 있음
user?.address?.street   // 나쁨 - user가 없는 실수를 놓칠 수 있음
```

### 단락 평가

`?.` 왼쪽이 `null`이나 `undefined`면 오른쪽은 아예 실행되지 않는다.

```js
let user = null;
let x = 0;

user?.sayHi(x++); // 아무 일도 안 일어남
alert(x); // 0 - x는 증가하지 않았다
```

### 세 가지 형태

| 문법 | 동작 |
|---|---|
| `obj?.prop` | obj가 있으면 `obj.prop`, 없으면 `undefined` |
| `obj?.[prop]` | obj가 있으면 `obj[prop]`, 없으면 `undefined` |
| `obj?.method()` | obj가 있으면 `obj.method()` 호출, 없으면 `undefined` |

```js
let user1 = {
  admin() { alert("관리자입니다."); }
};
let user2 = {};

user1.admin?.(); // "관리자입니다."
user2.admin?.(); // 에러 안 남, 아무 일도 안 일어남
```

`?.`은 읽기와 삭제에는 쓸 수 있지만, 쓰기(할당)에는 쓸 수 없다.

```js
user?.name = "John"; // SyntaxError
```
