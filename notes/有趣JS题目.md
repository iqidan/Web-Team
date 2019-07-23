# 有趣JS题目
## 1 基本逻辑运算
```javascript
console.log(1>2>3);
```

## 2 基本逻辑运算
```javascript
console.log([0,1,2,3][0,1,2,3]);
```

## 3 原型链问题
```javascript
function Obj(){this.b=5;}//this.b 赋值, 不会往作原型链上找

var o1 = new Obj();

Obj.prototype = {a:1, b:2};//改变原型的指向的对象 此时记录o1.__proto__保存的还是老的值

var o2 = new Obj();

console.log("o1.a=", o1.a);
console.log("o2.a=", o2.a);
console.log("o1.constructor=", o1.constructor);
console.log("o2.constructor=", o2.constructor);


console.log("o1.b=", o1.b);
console.log("o2.b=", o2.b);
console.log("o1.__proto__.b=", o1.__proto__.b);
console.log("o2.__proto__.b=", o2.__proto__.b);
```

## 4 基本数据转换为对象的规则
Primitive types like boolean, number and strings are not objects, they could be converted to objects. What the rule? 
JavaScript has six built-in types: null, undefined, number, string, boolean and object. The conversion rule is simple: if input is object, leave it as is; if input is null or undefined, throw an exception; otherwise create new object (new Number(input) or new String(input) or new Boolean(input)). 
```javascript
var a = 5;

a.t = 3;//JavaScript creates new object Number with value equals to “a” (5 in our case), then create new property “t” with value 3. But then this object is not assigned back to variable “a”, it is just disappear in garbage. 

console.log("a.t=", a.t);
```

## 5 js的作用域问题和[变量提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)
```javascript
if (!("a" in window)) {
    var a = 1;
}
console.log("a=", a);
```

## 6 函数表达式的作用域问题
```javascript
var a = 1,
    b = function a(x) {
        console.log("a==", a);
        x && a(--x);
        console.log("x==", x);
    };
console.log("a=", a);
```

## 7 同一作用域,重复声明的情况

```javascript
function a(x) {
    return x * 2;
}
var a;
console.log("a=", a);
```
## 7 改变this指向 试试null undefined
If thisArg is null or undefined, the called function is passed the global object as the this value. Otherwise, the called function is passed ToObject(thisArg) as the this value.
```javascript
function a() {
    console.log(this);
}
a.call(null);
```

## 8 条件语句中函数定义(尝试不同浏览器运行效果)
```javascript
console.log("foo==", foo);
if (1==true) {
    function foo () {
        console.log("a");
    }
} else {
    function foo () {
        console.log("b");
    }
}
console.log("foo==", foo);
```





