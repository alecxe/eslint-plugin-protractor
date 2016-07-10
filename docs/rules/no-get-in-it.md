# Recommend against having `browser.get()` or `browser.driver.get()` inside `it()`

This rule enforces the [Navigate to the page under test before each test](https://github.com/angular/protractor/blob/master/docs/style-guide.md#navigate-to-the-page-under-test-before-each-test) Protractor Style Guide recommendation.

The rule currently does not allow to configure the test function names and will only look for `it()` test names.

## Rule details

Any use of the following patterns are considered warnings:

```js
it("should do something", function() { browser.get("mypage"); });
it("should do something", function() { browser.driver.get("mypage"); });
```

The following patterns are not warnings:

```js
beforeEach(function() { browser.get("mypage"); });
beforeEach(function() { browser.driver.get("mypage"); });
it("should do something", function() { browser.waitForAngular() });
```
