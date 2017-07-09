# Ensure correct locator argument type for `element()`, `element.all()`, `$()` and `$$()` 

This rule would warn if there is a incorrect "by" locator type passed to `element()` and `element.all()`. 
Additionally, this rule would warn if there is a "by"-type locator passed to `$()` and `$$()` shortcuts.

## Rule details

:thumbsdown: Any use of the following patterns are considered errors:

```js
element(".class");
element.all(".class");
$(by.css(".class"));
$$(by.css(".class"));
element(by.css(".class1")).element(".class2");
element(by.css(".class1")).all(".class2");
element.all(by.css(".class1")).all(".class2");
$(".class1").all(".class2");
$(".class1").element(".class2");
$$(".class1").all(".class2");
$(".class1").$(by.css(".class2"));
$(".class1").$$(by.css(".class2"));
$$(".class1").$$(by.css(".class2"));
```

:thumbsup: The following patterns are not errors:

```js
element(by.css(".class"));
element.all(by.css(".class"));
$(".class");
$$(".class");
element(by.css(".class1")).element(by.css(".class2"));
element(by.css(".class1")).all(by.css(".class2"));
element.all(by.css(".class1")).all(by.css(".class2"));
$(".class1").all(by.css(".class2"));
$(".class1").element(by.css(".class2"));
$$(".class1").all(by.css(".class2"));
$(".class1").$(".class2");
$(".class1").$$(".class2");
$$(".class1").$$(".class2");
```
