# Warn about using removed `getInnerHtml()` and `getOuterHtml()` methods

`Selenium` [has removed `getInnerHtml()` and `getOuterHtml()` methods from the API](https://github.com/SeleniumHQ/selenium/blob/427307d6e24000d7db68e8c36362fab05c477cce/javascript/node/selenium-webdriver/CHANGES.md#api-changes-4).
And, hence, [`Protractor` removed them as well in version 5.0.0](https://github.com/angular/protractor/blob/ea72d5588aef983aa84705abd1ad1afa36065be7/CHANGELOG.md#500).

## Rule details

:thumbsdown: Any use of the following patterns are considered errors:

```js
expect(element(by.id("myid")).getInnerHtml()).toEqual("test");
expect(element(by.id("myid")).getOuterHtml()).toEqual("test");
element.all(by.css(".class")).first().getOuterHtml();
element(by.id("id")).all(by.css(".class")).last().getInnerHtml();
$$(".class").first().getOuterHtml();
$(".class").getInnerHtml().then(function (html) { console.log(html) });
```

:thumbsup: The following patterns are not warnings:

```js
expect(element(by.id("myid")).getText()).toEqual("test");
getInnerHtml();
var html = getOuterHtml();
elm.getInnerHtml();
elm.getOuterHtml();
```
