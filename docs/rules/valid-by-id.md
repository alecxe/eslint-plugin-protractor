# Warn if using invalid ID values

Ensure ID is valid when using `by.id`. We take [HTML4 standard](https://www.w3.org/TR/html4/types.html#type-id)
to determine the validness of the ID. Basically we are checking if the ID matches the following rule:

> ID and NAME tokens must begin with a letter ([A-Za-z]) and may be followed by any number of letters,
digits ([0-9]), hyphens ("-"), underscores ("_"), colons (":"), and periods (".").

Let's take into account that [HTML5](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)
is even more permissive which could result in conflicts with this rule.

This rule is very useful for notifying when an invalid html `id` is being used.

## Rule details

Any use of the following patterns are considered errors when using `by.id`:

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
