# Recommend against using `browser.driver`, use `browser` directly instead

The rule would warn if using `browser.driver` instead of using `browser` directly, as `browser` contains all the `browser.driver` methods.

## Rule details

Any use of the following patterns are considered warnings:

```js
browser.driver.sleep(2000);
var driver = browser.driver;
```

The following patterns are not warnings:

```js
browser.sleep(1000);
var test = browser.getTitle();
```

This rule is disabled by default as it is not mandatory, but a good practice.
Please enable if applicable in your case.
