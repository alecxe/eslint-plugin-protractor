# Recommend against navigating to absolute URLs inside `browser.get()` or `browser.driver.get()`

The rule would warn if `browser.get()` or `browser.driver.get()` are called with an absolute URL as an argument. 

Instead, it is recommended to have [`baseUrl` configuration option](https://github.com/angular/protractor/blob/master/docs/referenceConf.js) set and navigating to relative URLs in tests.
This helps to easily switch to a different target application URL by simply changing the `baseUrl` setting (e.g. switch from dev to test or staging).

## Rule details

:thumbsdown: Any use of the following patterns are considered warnings:

```js
browser.get("http://google.com");
browser.driver.get("https://google.com");
```

:thumbsup: The following patterns are not warnings:

```js
browser.get("login");
browser.driver.get("account/signup");
```
