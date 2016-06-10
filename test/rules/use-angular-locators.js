'use strict'

var rule = require('../../lib/rules/use-angular-locators')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('use-angular-locators', rule, {
  valid: [
    'element(by.model("test"));',
    'element(by.binding("test"));',
    'element(by.exactBinding("test"));',
    'element.all(by.repeater("item in items"));',
    'element.all(by.exactRepeater("item in items"));',
    'element.all(by.options("item in items"));'
  ],

  invalid: [
    {
      code: 'element(by.css("[ng-model=test]"));',
      errors: [
        {
          message: 'Unexpected "ng-model" attribute used inside a CSS selector. Use by.model() locator instead'
        }
      ]
    },
    {
      code: 'element.all(by.css("[data-ng-model=test]"));',
      errors: [
        {
          message: 'Unexpected "ng-model" attribute used inside a CSS selector. Use by.model() locator instead'
        }
      ]
    },
    {
      code: '$("[ng-bind=test]");',
      errors: [
        {
          message: 'Unexpected "ng-bind" attribute used inside a CSS selector. Use by.binding() or by.exactBinding() locator instead'
        }
      ]
    },
    {
      code: '$$("[data-ng-bind=test]");',
      errors: [
        {
          message: 'Unexpected "ng-bind" attribute used inside a CSS selector. Use by.binding() or by.exactBinding() locator instead'
        }
      ]
    },
    {
      code: 'element(by.id("test")).$(\'[ng-repeat="item in items"]\');',
      errors: [
        {
          message: 'Unexpected "ng-repeat" attribute used inside a CSS selector. Use by.repeater() or by.exactRepeater() locator instead'
        }
      ]
    },
    {
      code: 'element(by.id("test")).$$(\'[data-ng-repeat="item in items"]\');',
      errors: [
        {
          message: 'Unexpected "ng-repeat" attribute used inside a CSS selector. Use by.repeater() or by.exactRepeater() locator instead'
        }
      ]
    },
    {
      code: 'element(by.id("test")).$(\'[ng-options="item in items"]\');',
      errors: [
        {
          message: 'Unexpected "ng-options" attribute used inside a CSS selector. Use by.options() locator instead'
        }
      ]
    },
    {
      code: 'element(by.id("test")).$$(\'[data-ng-options="item in items"]\');',
      errors: [
        {
          message: 'Unexpected "ng-options" attribute used inside a CSS selector. Use by.options() locator instead'
        }
      ]
    }
  ]
})
