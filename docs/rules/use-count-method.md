# Recommend using `count()` instead of `then()` and `length`

When you need to assert how many elements were found, it is more readable and easier when you do it using [`count()`](http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.count):

```js
expect(element.all(by.repeater('product in products')).count()).toBeGreaterThan(1);
```

instead of resolving the `ElementArrayFinder` value and getting the `.length` property:

```js
element.all(by.repeater('product in products')).then(function (products) {
    expect(products.length >= 1).toBeTruthy();
});
```

## Rule details

:thumbsdown: Any use of the following patterns are considered warnings:

```js
element.all(by.repeater('product in products')).then(function (products) {
    expect(products.length >= 1).toBeTruthy();
});

element.all(by.repeater('product in products')).then(function (products) {
    expect(10).toEqual(products.length);
});
```

:thumbsup: The following patterns are not warnings:

```js
expect(element.all(by.repeater('product in products')).count()).toBeGreaterThan(1);

var products = [];
console.log(products.length);

element.all(by.repeater('product in products')).then(function (products) {
   console.log('test'); 
});
```
