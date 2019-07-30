# Warn if `executeScript()` or `executeAsyncScript()` are called with missing or empty script

This is a simple rule that would warn if `executeScript()`/`executeAsyncScript()` calls are missing arguments, or if the first argument is an empty string.

## Rule details

:thumbsdown: Any use of the following patterns are considered warnings:

```js
browser.executeScript();
browser.executeAsyncScript();
browser.executeScript("");
browser.executeAsyncScript('');
```

:thumbsup: The following patterns are not errors:

```js
browser.executeScript("var a = 1;");
browser.executeAsyncScript("var a = 1;");
var tag = browser.executeScript('return arguments[0].tagName', el);
browser.executeAsyncScript('var callback = arguments[arguments.length - 1];');
```
