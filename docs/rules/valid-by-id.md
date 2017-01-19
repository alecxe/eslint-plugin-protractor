# Prohibit use of invalid ID values 

Ensure ID is valid when using `by.id`.

This rule is very useful for notifying when an invalid html `id` is being used.

## Rule details

Any use of the following patterns are considered errors:

```js
element(by.id("#id"));
element(by.id("1startwithnumber"));
element(by.id("_"));
element(by.id("#"));
element(by.id("invalid*id"));
element(by.id("id with spaces"));
```

The following patterns are not errors:

```js
element(by.id("validID"));
element(by.css(".myclass"));
element.all(by.id("simpleid"));
element.all(by.id("foo-bar"));
element.all(by.id("foo:bar"));
element.all(by.id("foo_bar"));
element.all(by.id("foo.bar"));
element.all(by.id("a123456789"));
element.all(by.id("a1-_:.r2D2"));
```
