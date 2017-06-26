# Warn about potentially complex selectors with too many nodes

This rule would warn if a CSS selector is too "deep" - has a significant number of nodes in the path. 

For instance, this CSS selector would be considered fragile and complex, because of 6 nodes in the path:

```css
.content > table > tbody > tr:nth-child(2) > td.cell > input#email
```

A simpler version in this case could be (2 nodes):

```css
.content input#email
```

The idea behind this rule is that the more nodes you have in your CSS selector path - the more fragile, the more dependant on the HTML structure of the page it is.

Number of nodes is configurable, default value is `5`.

## Rule details

This rule is based on [`css-selector-parser`](https://github.com/mdevils/node-css-selector-parser) parsing abilities.

Any use of the following patterns are considered warnings (with the default depth value of `5`):

```js
element(by.css(".content > table > tbody > tr:nth-child(2) > td.cell > input#email"));
element.all(by.css(".content > table > tbody > tr:nth-child(2) > td.cell > input#email"));
$(".content > table > tbody > tr:nth-child(2) > td.cell > input#email");
$$(".content > table > tbody > tr:nth-child(2) > td.cell > input#email");
```

The following patterns are not warnings:

```js
element(by.css(".myclass"));
element.all(by.css(".content input#email"));
$("#email");
$$("tr:nth-child(2)");
```
