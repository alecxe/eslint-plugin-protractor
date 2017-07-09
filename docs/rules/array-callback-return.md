# Enforce `return` statements in callbacks of `ElementArrayFinder` methods

`ElementArrayFinder` has multiple methods for filtering, mapping, reducing:

 * [`map()`](http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.map)
 * [`filter()`](http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.filter)
 * [`reduce()`](http://www.protractortest.org/#/api?view=ElementArrayFinder.prototype.reduce)
 
The callbacks for these methods have to return something for the method to work properly.

This rule would issue a warning if there is no `return` statement detected in the callback.

## Known Limitations

This rule checks callback functions of methods with the given names only if called on `element.all()` or `$$()` explicitly.
This means, that if there is, for example, a page object field which is later filtered:

```js
myPage.rows.filter(function (row) {
    row.getText();
});
```

it would not be detected as a violation. Look into having [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return) built-in ESLint rule enabled to catch these cases.

## Rule details

:thumbsdown: Any use of the following patterns are considered warnings:

```js
element.all(by.css(".myclass")).filter(function() {
  elm.getText().then(function (text) { 
    return text.indexOf("test") >= 0;
  })
});

$$(".myclass").filter(function cb() { if (a) return true; });
element(by.id("myid")).$$(".myclass").filter(function() { switch (a) { case 0: break; default: return true; } });
$$(".myclass").filter(function() { return; });
$$(".myclass").filter(function() { if (a) return; else return; });
$$(".myclass").filter(a ? function() {} : function() {});
$$(".myclass").filter(function(){ return function() {}; }())
```

:thumbsup: The following patterns are not warnings:

```js
element.all(by.css(".myclass")).filter(function(elm) { 
  return elm.getText().then(function (text) { 
    return text.indexOf("test") >= 0;
  })
});

$$(".myclass").reduce(function() { return true; });
$$(".myclass").reduce(function() { switch (a) { case 0: bar(); default: return true; } })
var elements = element.all(by.css(".myclass"));
```
