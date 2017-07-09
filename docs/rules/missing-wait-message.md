# Missing wait timeout message in `browser.wait()`

Ensure the timeout message is set when `browser.wait()` is called.

## Rule details

This rule triggers a warning if there is no message in case `browser.wait()` timeouts. 
Having explicit timeout messages helps in debugging and troubleshooting the test failures.

:thumbsdown: The following patterns are considered warnings:

```js
browser.wait(EC.presenceOf(elm), 5000);
browser.wait(EC.visibilityOf(elm), 5000);
```

:thumbsup: The following patterns are not warnings:

```js
browser.wait(EC.presenceOf(elm), 5000, "The user menu is not present");
browser.wait(EC.elementToBeClickable(elm), 5000, "The submit button has not become clickable. Watch for the modal popup not to be opened.");
```
