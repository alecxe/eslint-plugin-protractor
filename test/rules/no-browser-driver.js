'use strict'

var rule = require('../../lib/rules/no-browser-driver')
var RuleTester = require('eslint').RuleTester
var eslintTester = new RuleTester()

eslintTester.run('no-browser-driver', rule, {
  valid: [
    'browser.get();',
    'browser.get("mypage");',
    'browser.sleep(1000);',
    'browser.getTitle();',
    'browser.method(function() {});',
    'var test = browser.get("MYPAGE");',
    'var test = browser.attribute;'
  ],

  invalid: [
    {
      code: 'browser.driver.sleep(2000);',
      errors: [{
        message: 'Unexpected use of browser.driver instead of browser'
      }]
    },
    {
      code: 'var test = browser.driver.getTitle();',
      errors: [
        {
          message: 'Unexpected use of browser.driver instead of browser'
        }
      ]
    },
    {
      code: 'var test = browser.driver.attribute;',
      errors: [{
        message: 'Unexpected use of browser.driver instead of browser'
      }]
    },
    {
      code: 'var driver = browser.driver;',
      errors: [{
        message: 'Unexpected use of browser.driver instead of browser'
      }]
    }
  ]
})
