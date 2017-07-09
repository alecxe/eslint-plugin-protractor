# Discourage the use of `browser.pause()`

Ensure `browser.pause()` is not used.

## Rule details

`browser.pause()` usage is useful for debugging, but can cause problems in automated environments.
This rule would issue an error if `browser.pause()` is used.

:thumbsdown: The following patterns are considered warnings:

```js
browser.pause();
```

:thumbsup: The following patterns are not warnings:

```js
browser.notPause();
```
