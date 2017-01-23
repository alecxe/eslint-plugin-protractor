# Prohibit use of invalid Tag Name value when using `by.tagName()` locator

Ensure a valid Tag Name is being used with `by.tagName()` locator. 
The rule supports [HTML specifications]((https://www.w3.org/TR/html/syntax.html#tag-name)) and
Angular's ability to create custom elements via directives. A Tag Name is considered valid when:
 
 - It can contain alphanumeric characters.
 - It can contain the dash`(-)` symbol.
 - It cannot start with dash or a number.
 - It cannot end with dash.

This rule is very useful for notifying when an invalid Tag Name is being used. 
It will also prevent unintentionally putting different types of locators instead of the actual Tag name.

## Rule details

Any use of the following patterns are considered errors when using `by.tagName`:

```js
element(by.tagName("_customTagName"));
element(by.tagName("div.classname"));
element(by.tagName("blockquote:"));
element(by.tagName("multiple tagnames"));
element(by.tagName('option[value="Test"]'));
element(by.tagName(" div "));
element(by.tagName("12345"));
element(by.tagName("-"));
element(by.tagName("customtag-"));
```

The following patterns are not errors:

```js
element(by.tagName("a"));
element(by.tagName("b"));
element(by.tagName("i"));
element(by.tagName("A"));
element(by.tagName("Area"));
element(by.tagName("BlockQuote"));
element(by.tagName("h1"));
element(by.tagName("H1"));
element(by.tagName("my-custom-tag"));
```
