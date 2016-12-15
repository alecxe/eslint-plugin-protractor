# Warn about using deprecated `getInnerHtml()` and `getOuterHtml()` methods

Selenium [has deprecated `getInnerHtml()` and `getOuterHtml()` methods in version 2.53](https://github.com/SeleniumHQ/selenium/blob/96ed95a97405fa267eea09c4008cda9e7703e84d/javascript/node/selenium-webdriver/CHANGES.md#change-summary).
And, hence, Protractor itself _does not have these methods documented_ as a part of [public API](http://www.protractortest.org/#/api) anymore.

## Rule details

Any use of the following patterns are considered warnings:

```js
expect(element(by.id("myid")).getInnerHtml()).toEqual("test");
expect(element(by.id("myid")).getOuterHtml()).toEqual("test");
element.all(by.css(".class")).first().getOuterHtml();
element(by.id("id")).all(by.css(".class")).last().getInnerHtml();
$$(".class").first().getOuterHtml();
$(".class").getInnerHtml().then(function (html) { console.log(html) });
```

The following patterns are not warnings:

```js
expect(element(by.id("myid")).getText()).toEqual("test");
getInnerHtml();
var html = getOuterHtml();
elm.getInnerHTML();
elm.getOuterHTML();
```
