# Disallow using `ElementArrayFinder` methods on `ElementFinder`

This rule is inspired by [this problem](http://stackoverflow.com/questions/39710881/protractor-locator-issues) when `ElementArrayFinder` methods were unintentionally used on `ElementFinder`.

This rule is especially useful if ESLint is configured in your IDE to scan on the fly - you would catch these kinds of problems early.

## Rule details

Here is the current list of methods the rule is looking for:   

    'first', 'last', 'get', 'filter', 'map', 'each', 'reduce', 'count'

Any use of the following patterns are considered warnings:

```js
element(by.css(".class")).get(0);
$(".class").first();
element(by.css(".class")).last();
element(by.css(".class")).map(function (elm) {});
$(".class").filter(function (elm) {});
element(by.css(".class")).each(function (elm) {});
element(by.css(".class1")).element(by.css(".class2")).first();
element(by.css(".class1")).$(".class2").first();
$(".class1").element(by.css(".class2")).first();
$(".class1").$(".class2").first();
```

The following patterns are not warnings:

```js
element.all(by.css(".class")).get(0);
$$(".class").first();
element.all(by.css(".class")).last();
element.all(by.css(".class")).map(function (elm) {});
$$(".class").filter(function (elm) {});
element.all(by.css(".class")).each(function (elm) {});
element(by.css(".class1")).element.all(by.css(".class2")).first();
element(by.css(".class1")).$$(".class2").first();
$(".class1").element.all(by.css(".class2")).first();
$(".class1").$$(".class2").first();
```
