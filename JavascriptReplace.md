# Javascript replace()

* g : global (모든 문자 치환)
* i : ignore char (대소문자 무시)

```javascript
var p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';
console.log(p.replace('dog', 'monkey'));
console.log(p.replace(/dog/gi, 'ferret'));
```

### 다른 정규식 보기

> 특정문자 제거  : str.replace(/\-/g,''); <br>
> 앞의 공백 제거  : str.replace(/^\s+/,''); <br>
> 뒤의 공백 제거  : str.replace(/\s+$/,''); <br>
> 앞뒤 공백 제거  : str.replace(/^\s+|\s+$/g,'');<br>
> 문자열 내의 공백 제거  : str.replace(/\s/g,'');<br>
> 개행 제거  : str.replace(/>/g,'');<br>
> 엔터 제거  : str.replace(/\r/g,'');<br>
> 0 제거  : str.replace(/[^(1-9)]/gi,"");<br>

### 정규식에서 문자가 의미하는 뜻
> [a-z] : a ~ z 사이의 문자를 찾음<br>
> [abc] : a, b, c중 하나를 찾음<br>
> [^abc] : a, b, c를 제외한 문자를 찾음<br>
> .z : 아무 문자 하나를 . 기호로 찾으며 z로 끝남을 의미<br>
> .a+ : a가 1개 이상을 의미함<br>
> .a* : a가 0개 또는 그 이상을 의미함<br>
> s : 공백 문자를 찾음(스페이스, 탭 등)<br>
> S : 공백이 아닌 문자를 찾음<br>
> d : 숫자를 찾음<br>
> D : 숫자가 아닌 문자를 찾음<br>
> w : 알파벳 영문과 숫자와 언더바 _ 기호를 찾음<br>
> W : 알파벳 영문과 숫자와 언더바 _ 기호가 아닌 것을 찾음<br>
> t : 탭 공간을 찾음<br>
> v : 버티칼 탭 공간을 찾음<br>
> g : 검색범위를 전역으로 확장<br>
> i : 대소문자를 구분하지 않음<br>
> gi : 검색 범위를 전역으로 확대하면서 대소문자를 구분하지 않음<br>
> m : 여러줄을 동시에 매칭함<br>
