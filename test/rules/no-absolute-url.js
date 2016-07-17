'use strict'

var rule = require('../../lib/rules/no-absolute-url')
var RuleTester = require('eslint').RuleTester
var eslintTester = new RuleTester()

eslintTester.run('no-absolute-url', rule, {
  valid: [
    'browser.get();',
    'browser.driver.get();',
    'browser.get("mypage");',
    'browser.driver.get("mypage");',
    'browser.get("MYPAGE");',
    'browser.driver.get("MYPAGE");',
    'browser.get("/mypage/mypage");',
    'browser.driver.get("/mypage/mypage");'
  ],

  invalid: [
    {
      code: 'browser.get("http://google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    },
    {
      code: 'browser.driver.get("https://google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    },
    {
      code: 'browser.get("HTTP://google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    },
    {
      code: 'browser.driver.get("HTTPS://google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    },
    {
      code: 'browser.get("ftp://google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    },
    {
      code: 'browser.driver.get("ftp://google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    },
    {
      code: 'browser.get("//google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    },
    {
      code: 'browser.driver.get("//google.com");',
      errors: [{
        message: 'Unexpected absolute URL'
      }]
    }
  ]
})
