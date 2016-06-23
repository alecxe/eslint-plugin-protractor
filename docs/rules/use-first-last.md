# Recommend using `first()` instead of `get(0)` and `last()` instead of `get(-1)`

The `first()` and `last()` shortcuts is, generally speaking, more readable than `get(0)` and `get(-1)`.

## Rule details

Any use of the following patterns are considered warnings:

```js
element.all(by.css(".class")).get(0);
element(by.id("id")).all(by.css(".class")).get(-1);
$$(".class").get(0);
element(by.id("id")).$$(".class").get(-1);
element.all(by.css(".class")).get(0).getText();
element.all(by.css(".class")).get(-1).getText();
```

The following patterns are not warnings:

```js
element.all(by.css(".class")).first();
element(by.id("id")).all(by.css(".class")).last();
$$(".class").first();
element(by.id("id")).$$(".class").last();
element.all(by.css(".class")).get(1);
element(by.id("id")).all(by.css(".class")).get(-10).getText();
$$(".class").get(10);
element(by.id("id")).$$(".class").get(-10);
var myMap = new Map(); myMap.get(0);
var myMap = new Map(); myMap.get(-1);
```
