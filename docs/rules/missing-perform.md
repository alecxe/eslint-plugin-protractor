# Enforce valid `browser.actions()` usage

Ensure `perform()` is called on `browser.actions()` chain of actions.

## Rule details

This rule triggers an error if there is no `perform()` at the end of the `browser.actions()` chain. 
Note that there has to be at least one applied action to trigger the rule. In other words, `var actions = browser.actions();` is considered valid since it is quite a common pattern.

The following patterns are considered errors:

```js
browser.actions().click();
browser.actions().mouseMove(elm);
```

The following patterns are not errors:

```js
var actions = browser.actions();
browser.actions().click(elm).perform();
browser.actions().mouseMove(elm).click().perform();
browser.actions().dragAndDrop(elm1, elm2).perform();
```
