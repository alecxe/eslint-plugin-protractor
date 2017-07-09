# Prohibit creating invalid CSS selectors

Ensure CSS selectors are syntactically correct.

This rule works great when ESLint is tied up to your editor of choice to make checks on the fly.

## Rule details

This rule is almost entirely based on [`css-selector-parser`](https://github.com/mdevils/node-css-selector-parser) parsing abilities.

:thumbsdown: Any use of the following patterns are considered errors:

```js
element(by.css("["));
element.all(by.css(")"));
$("[myattr=value");
$$("myattr=value]");
$("[class='ng-invalid]");
$$("input:first-of-type(");
$("input:first-of-type");
element(by.id("id")).$$("input::first-type");
element(by.id("id")).$("input::first-of--type()");
```

:thumbsup: The following patterns are not errors:

```js
element(by.css(".myclass"));
element.all(by.css(".myclass"));
$(".myclass");
$$(".myclass");
$("[class='myclass']");
$$("[class*='myclass']");
$(".myclass.myotherclass");
$$(".myotherclass.myclass");
$("input[id^=test]");
var s = "ng-scope";
element(by.id("ng-isolate-scope"));
```
