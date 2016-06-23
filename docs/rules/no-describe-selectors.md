# Discourage nested selectors within describe blocks (no-describe-selectors)

Ensure raw selectors are not used within `describe` blocks.

## Rule details

As described in [Protractor's documentation](https://github.com/angular/protractor/blob/master/docs/page-objects.md), it is recommended that query selectors be organized within Page Objects in order to keep code cleaner, more reusable, and easier to maintain.

Any use of the following patterns are considered warnings:

```js
describe(function () {
  // Protractor selectors:
  element(by.addLocator('newLocator', function () { } ));
  element(by.binding('something.binding'));
  element(by.exactBinding('something.binding'));
  element(by.model('something.model'));
  element(by.buttonText('buttonText'));
  element(by.partialButtonText('partialButtonText'));
  element(by.repeater('something in repeater'));
  element(by.exactRepeater('value in exactRepeater'));
  element(by.cssContainingText('.css', 'Contained text'));
  element(by.options('o for o in options'));
  element(by.deepCss('.deepCss'));
  element(by.className('className'));

  // Inherited from WebDriver:
  element(by.css('.css'));
  element(by.id('id'));
  element(by.linkText('linkText'));
  element(by.js('js'));
  element(by.name('name'));
  element(by.partialLinkText('partialLinkText'));
  element(by.tagName('tagName'));
  element(by.xpath('//xpath'));
});
```

The following patterns are not warnings:

```js
var AngularHomepage = function() {
  var nameInput = element(by.model('yourName'));
  var greeting = element(by.binding('yourName'));

  this.get = function() {
    browser.get('http://www.angularjs.org');
  };

  this.setName = function(name) {
    nameInput.sendKeys(name);
  };

  this.getGreeting = function() {
    return greeting.getText();
  };
};
```
