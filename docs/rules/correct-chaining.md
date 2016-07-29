# Prohibit incorrect chaining of `element` and `element.all`

A rather common mistake can occur when it is needed to [find multiple elements in the context of an element using chaining](https://github.com/angular/protractor/blob/master/docs/locators.md#finding-sub-elements). Example:

```js
element(by.css('.parent')).element.all(by.css('.child'));
//    element IS NOT NEEDED^^^^^^^
```

Correct chaining:

```js
element(by.css('.parent')).all(by.css('.child'));
```

**Fixable:** This rule is automatically fixable using the `--fix` flag on the command line.

## Rule details

Any use of the following patterns are considered warnings:

```js
element(by.css('.parent')).element.all(by.css('.child'));
$('.parent').element.all(by.css('.child'));
element.all(by.css('.child')).first().element.all(by.css('.child'));
$$('.parent').first().element.all(by.css('.child'));
```

The following patterns are not warnings:

```js
element(by.css('.parent')).all(by.css('.child'));
$('.parent').all(by.css('.child'));
element.all(by.css('.child')).first().all(by.css('.child'));
$$('.parent').first().all(by.css('.child'));
element(by.css('.parent')).element(by.css('.child'));
```
