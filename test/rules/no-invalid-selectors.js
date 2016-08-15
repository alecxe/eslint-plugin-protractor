'use strict'

var rule = require('../../lib/rules/no-invalid-selectors')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-invalid-selectors', rule, {
  valid: [
    'element(by.css(".myclass"));',
    'element.all(by.css(".myclass"));',
    '$(".myclass");',
    '$$(".myclass");',
    '$("[class=\'myclass\']");',
    '$$("[class*=\'myclass\']");',
    '$(".myclass.myotherclass");',
    '$$(".myotherclass.myclass");',
    '$("input[id^=test]");',
    'var s = "ng-scope";',
    'element(by.id("ng-isolate-scope"));',
    '$();',
    '$$();',
    'element(by.css());',
    'element.all(by.css());'
  ],

  invalid: [
    {
      code: 'element(by.css("["));',
      errors: [
        {
          message: 'Invalid CSS selector: "["'
        }
      ]
    },
    {
      code: 'element.all(by.css(")"));',
      errors: [
        {
          message: 'Invalid CSS selector: ")"'
        }
      ]
    },
    {
      code: '$("[myattr=value");',
      errors: [
        {
          message: 'Invalid CSS selector: "[myattr=value"'
        }
      ]
    },
    {
      code: '$$("myattr=value]");',
      errors: [
        {
          message: 'Invalid CSS selector: "myattr=value]"'
        }
      ]
    },
    {
      code: '$$("[class=\'ng-invalid]")',
      errors: [
        {
          message: 'Invalid CSS selector: "[class=\'ng-invalid]"'
        }
      ]
    },
    {
      code: '$$("input:first-of-type(");',
      errors: [
        {
          message: 'Invalid CSS selector: "input:first-of-type("'
        }
      ]
    },
    {
      code: '$("&%div.answer");',
      errors: [
        {
          message: 'Invalid CSS selector: "&%div.answer"'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$$(",");',
      errors: [
        {
          message: 'Invalid CSS selector: ","'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$("first-of--type()");',
      errors: [
        {
          message: 'Invalid CSS selector: "first-of--type()"'
        }
      ]
    },
    {
      code: '$("input:first-of-type)(");',
      errors: [
        {
          message: 'Invalid CSS selector: "input:first-of-type)("'
        }
      ]
    },
    {
      code: '$("> input");',
      errors: [
        {
          message: 'Invalid CSS selector: "> input"'
        }
      ]
    },
    {
      code: '$("input:first-child,");',
      errors: [
        {
          message: 'Invalid CSS selector: "input:first-child,"'
        }
      ]
    }
  ]
})
