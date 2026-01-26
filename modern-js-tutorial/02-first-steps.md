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
