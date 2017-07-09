# Discourage using Bootstrap layout-oriented CSS classes inside CSS selectors

Ensure layout-oriented Bootstrap classes are not used inside CSS selectors. 

Classes like `col-lg-pull-5` or `col-sm-offset-11` define a container layout on a page and do not bring any valuable information about the element. Neither they uniquely identify elements. 
Compare these classes with, for example, `product` or `itemPrice` classes - these classes are, generally, a good choice to base locators on since they have a "data" meaning not related to the way elements are presented on a page.

## Rule details

Current list of Bootstrap classes this rule would complain about can be viewed [here](../../lib/bootstrap-layout-classes.js) (hand-picked).

:thumbsdown: Any use of the following patterns are considered warnings:

```js
element(by.css(".col-lg-12"));
element.all(by.css(".col-lg-offset-11"));
$(".col-sm-11");
$$(".col-sm-push-4");
$("[class='col-md-10']");
$$("[class*='col-md-offset-4']");
$(".myclass.col-lg-pull-8");
element(by.id("id")).$$(".col-lg-offset-8.myclass");
element(by.id("id")).$("input.col-lg-pull-8");
```

:thumbsup: The following patterns are not warnings:

```js
element(by.css(".myclass"));
element.all(by.css(".myclass"));
$(".myclass");
$$(".myclass");
$("input.myclass");
```
