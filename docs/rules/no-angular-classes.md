# Discourage using Angular CSS classes inside CSS selectors

Ensure CSS classes used by Angular internally are not used to locate elements via Protractor.

## Rule details

Current list of Angular classes this rule would complain about (based on the [CSS styling documentation page](https://docs.angularjs.org/guide/css-styling)):

 * `ng-scope`
 * `ng-isolate-scope`
 * `ng-binding`
 * `ng-valid`
 * `ng-invalid`
 * `ng-pristine`
 * `ng-dirty`
 * `ng-touched`
 * `ng-untouched`

:thumbsdown: Any use of the following patterns are considered warnings:

```js
element(by.css(".ng-scope"));
element.all(by.css(".ng-isolate-scope"));
$(".ng-binding");
$$(".ng-valid");
$("[class='ng-invalid']");
$$("[class*='ng-pristine']");
$(".myclass.ng-dirty");
element(by.id("id")).$$(".ng-touched.myclass");
element(by.id("id")).$("input.ng-untouched");
```

:thumbsup: The following patterns are not warnings:

```js
element(by.css(".myclass"));
element.all(by.css(".myclass"));
$(".myclass");
$$(".myclass");
$("[class='myclass']");
$$("[class*='myclass']");
$(".myclass.myotherclass");
$$(".myotherclass.myclass");
$("input.myclass");
var s = "ng-scope";
element(by.id("ng-isolate-scope"));
```
