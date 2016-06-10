# Recommend using built-in Angular-specific locators 

Warn about using attributes like `ng-model`, `ng-bind`, `ng-repeat` and `ng-options` inside CSS selectors. Recommend built-in specific locators instead.

## Rule details

Here is a mapping between the relevant attribute and a recommended locator:

 * `ng-model`/`data-ng-model` -> `by.model()`
 * `ng-bind`/`data-ng-bind` -> `by.binding()` or `by.exactBinding()`
 * `ng-repeat`/`data-ng-repeat` -> `by.repeater()` or `by.exactRepeater()`
 * `ng-options`/`data-ng-options` -> `by.options()`

Any use of the following patterns are considered warnings:

```js
element(by.css("[ng-model=test]"));
element.all(by.css("[data-ng-model=test]"));
$("[ng-bind=test]");
$$("[data-ng-bind=test]");
element(by.id("test")).$('[ng-repeat="item in items"]');
element(by.id("test")).$$('[data-ng-repeat="item in items"]');
$('[ng-options="item in items"]');
$$('[data-ng-options="item in items"]');
```

The following patterns are not warnings:

```js
element(by.model("test"));
element(by.binding("test"));
element(by.exactBinding("test"));
element.all(by.repeater("item in items"));
element.all(by.exactRepeater("item in items"));
element.all(by.options("item in items"));
```
