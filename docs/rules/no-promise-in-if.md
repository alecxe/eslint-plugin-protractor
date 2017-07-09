# Warn if promise is checked for truthiness inside an `if` condition

It is a common error in Protractor to check if a promise is "truthy" forgetting to actually resolve promise to get a real value.
The problem is - promise itself is "truthy" which might make things difficult to spot and debug, or give a false sense of what tests are actually testing.

## Rule details

:thumbsdown: This is an example violation:

```js
var elm = $("#myid");
if (elm.isDisplayed()) {
    // do smth
} else {
    // do smth else
}
```

The code execution would never reach "do smth else" because `elm.isDisplayed()` would always be "truthy" no matter if the element is displayed or not.

:thumbsup: Instead, one has to explicitly resolve the promise to have a boolean value:

```js
var elm = $("#myid");
elm.isDisplayed().then(function (isDisplayed) {
  if (isDisplayed) {
      // do smth
  } else {
      // do smth else
  }
});
```

Here is a list of methods currently searched inside if conditions:

 * `isDisplayed()`
 * `isPresent()`
 * `isElementPresent()`
 * `isSelected()`
 * `isEnabled()`
