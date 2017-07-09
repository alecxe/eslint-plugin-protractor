# Warn about using removed `getRawId()` method

`getRawId()` method has been removed in [`Protractor` 5.0.0](https://github.com/angular/protractor/blob/ea72d5588aef983aa84705abd1ad1afa36065be7/CHANGELOG.md#500) and in [`Selenium` 3.0.0](https://github.com/SeleniumHQ/selenium/blob/427307d6e24000d7db68e8c36362fab05c477cce/javascript/node/selenium-webdriver/CHANGES.md#v300-beta-1). 
Use `getId()` method instead.

## Rule details

:thumbsdown: Any use of the following patterns are considered errors:

```js
expect(element(by.id("myid")).getRawId()).toEqual("id");
element.all(by.css(".class")).first().getRawId();
element(by.id("id")).all(by.css(".class")).last().getRawId();
$$(".class").first().getRawId();
$(".class").getRawId().then(function (id) { console.log(id) });
```

:thumbsup: The following patterns are not warnings:

```js
expect(element(by.id("myid")).getId()).toEqual("id");
getRawId();
var html = getRawId();
elm.getRawId();
```
