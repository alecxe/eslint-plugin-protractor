# Recommend using `$` and `$$` shortcuts

Recommend using `$` and `$$` shortcuts instead of `element(by.css())` and `element.all(by.css())` respectively.

## Rule details

The rule is disabled by default.

Any use of the following patterns are considered warnings:

```js
element(by.css(".class"));
element.all(by.css(".class"));
element(by.id("id")).element(by.css(".class"));
element(by.id("id")).all(by.css(".class"));
```

The following patterns are not warnings:

```js
$(".class");
$$(".class");
element(by.id("id")).$(".class");
element(by.id("id")).$$(".class");
```
