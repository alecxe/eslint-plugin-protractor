'use strict'

var rule = require('../../lib/rules/no-get-in-it')
var RuleTester = require('eslint').RuleTester
var eslintTester = new RuleTester()

eslintTester.run('no-get-in-it', rule, {
  valid: [
    'beforeEach(function() { browser.get("mypage"); });',
    'beforeEach(function() { browser.driver.get("mypage"); });',
    'browser.get("mypage");',
    'browser.driver.get("mypage");'
  ],

  invalid: [
    {
      code: 'it("should do something", function() { browser.get("mypage"); });',
      errors: [{
        message: 'Unexpected "browser.get()" inside it'
      }]
    },
    {
      code: 'it("should do something", function() { browser.driver.get("mypage"); });',
      errors: [{
        message: 'Unexpected "browser.driver.get()" inside it'
      }]
    }
  ]
})
