# Recommend using `protractor.promise.all()` to resolve multiple promises 

When multiple promises need to be resolved, it tends to increase the nestedness and complexity of the code. 

:thumbsdown: For example:

```js
elm1.getText().then(function (text1) {
  elm2.getText().then(function (text2) {
    elm3.getText().then(function (text3) {
      elm4.getText().then(function (text4) {
        // do smth with text1, text2, text3, text4
      });
    });
  });
});
```

:thumbsup: Instead, using `protractor.promise.all()` may help to resolve multiple promises "at once":

```js
protractor.promise.all([
  elm1.getText(),
  elm2.getText(),
  elm3.getText(),
  elm4.getText()
]).then(function (texts) {  // texts is now an array of texts
   // do smth with texts
});
```

## Rule details

The rule would look for the `.then()` method calls and warn if there is at least one more `.then()` among node's parents. 
Note that it would only look for `then` callback functions with at least one argument.

This rule is disabled by default mostly because I fear it is going to produce false positives too often. 
Please enable if applicable in your case.
