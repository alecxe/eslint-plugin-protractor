# Discourage the use of `browser.sleep()` (no-browser-sleep)

Ensure `browser.sleep()` is not used.

## Rule details

`browser.sleep()` usage is usually considered a bad practice and an Explicit Wait via the `browser.wait()` is suggested to be used instead.
This rule would issue a warning if `browser.sleep()` is used.

The following patterns are considered warnings:

```js
browser.sleep(10);
browser.sleep(10000);
```

The following patterns are not warnings:

```js
SomeObject.sleep(10);
browser.wait(EC.visibilityOf(elm), 5000, "Message");
```
