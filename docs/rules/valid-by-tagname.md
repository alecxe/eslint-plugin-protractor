# Prohibit use of invalid Html Tag Name value when using `by.tagName()` locator

Ensure a valid Tag Name is being used with `by.tagName()` locator. We only accept the listed 
[HTML tags here](http://www.w3schools.com/tags/) to determine the validness of the Tag Name.

This rule is very useful for notifying when an invalid html Tag Name is being used. 
It will also prevent unintentionally putting different types of locators instead of the actual Tag name.

## Rule details

Any use of the following patterns are considered errors when using `by.tagName`:

```js
element(by.tagName("customTagName"));
element(by.tagName("div.classname"));
element(by.tagName("_blockquote"));
element(by.tagName("divs"));
element(by.tagName('option[value="Test"]'));
element(by.tagName(" div "));
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
```
