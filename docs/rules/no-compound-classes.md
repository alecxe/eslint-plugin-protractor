# Do not allow compound class names in the `by.className()` locator

Ensure that there are no compound class names (multiple space-delimited classes) used as a value for the `by.className` locator.

`by.className()` expects a single valid class name.

## Rule details

Any use of the following patterns are considered errors:

```js
element(by.className("class1 class2"));
element.all(by.className("class1 class2"));
element(by.id("myid")).all(by.className("class1 class2 class3"));
element(by.id("myid")).element(by.className("class1 class2 class3"));
```

The following patterns are not errors:

```js
element(by.css("tag1 tag2"));
element(by.css(".class1"));
element(by.className("class1"));
element.all(by.className("somevalue"));
element.all(by.css("tag1 tag2"));
$("tag1 tag2");
$$("tag1 tag2")
```
