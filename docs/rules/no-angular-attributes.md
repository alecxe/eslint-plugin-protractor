# Discourage using Angular attributes inside CSS selectors

Ensure attributes used by Angular internally are not used to locate elements via Protractor.

## Rule details

The rule would scan attributes used inside CSS selectors and would complain about any attribute that starts with `ng-` or `data-ng-` or `x-ng-`.

:thumbsdown: Any use of the following patterns are considered warnings:

```js
element(by.css("[ng-show=test]"));
element.all(by.css("[ng-hide]"));
$("[ng-src*=test]");
$$("[x-ng-href$=com]");
$("[data-ng-cloak]");
$$("a[href^=/], .container:has(nav) > [ng-focus]");
$("a[href^=/], [ng-init*='test'] > .container");
element(by.id("id")).$$("[ng-blur^=expression], a[href^=/]");
element(by.id("id")).$("[data-ng-pattern*='test']");
```

:thumbsup: The following patterns are not warnings:

```js
element(by.css("input"));
element.all(by.css(".container"));
$(".show");
$$(".hide");
$("[cloak]");
$$("a[href^=/], .container:has(nav)");
$("a[href^=/], .container");
element(by.id("id")).$$("a[href^=/]");
element(by.id("id")).$("input");
var s = "ng-cloak";
element(by.id("data-ng-pattern"));
```
