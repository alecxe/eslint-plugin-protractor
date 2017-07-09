# Warn if a bare ElementFinder or ElementArrayFinder is declared with no applied action

This rule is inspired by [this problem](https://stackoverflow.com/questions/44841276/e2e-testing-in-protractor-signin) when there was an `ElementFinder` declared but no action was applied.

In this case, Protractor would not actually even try to locate the element, because [according to documentation](http://www.protractortest.org/#/locators#actions):

> The ElementFinder knows how to locate the DOM element using the locator you passed in as a parameter, but it has not actually done so yet. 
> It will not contact the browser until an action method has been called.

It is easy to forget to actually call an ElementFinder method and the rule would be handy in these kind of cases.

## Rule details


Any use of the following patterns are considered warnings:

```js
element(by.id('signin_submit_btn'));
element.all(by.className('myClass'));
element.all(by.css(".class")).get(0);
$(".class");
$$(".class").first();
element.all(by.css(".class")).last();
element(by.css(".class1")).element(by.css(".class2"));
element(by.css(".class1")).$(".class2");
$$(".class1").first().element(by.css(".class2"));
$(".class1").$(".class2");
```

The following patterns are not warnings:

```js
element(by.id('signin_submit_btn')).click();
element.all(by.className('myClass')).first().click();
element.all(by.css(".class")).get(0).sendKeys("test");
$(".class").sendKeys("test");
$$(".class").first().sendKeys("test");
element.all(by.css(".class")).last().click();
element(by.css(".class1")).element(by.css(".class2")).click();
element(by.css(".class1")).$(".class2").sendKeys("test");
$$(".class1").first().element(by.css(".class2")).sendKeys("test");
$(".class1").$(".class2").sendKeys("test");
```
