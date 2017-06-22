'use strict'

var rule = require('../../lib/rules/no-get-location-abs-url')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-get-location-abs-url', rule, {
  valid: [
    'SomeObject.getLocationAbsUrl();',
    'browser.wait(EC.visibilityOf(elm), 5000, "Message");'
  ],

  invalid: [
    {
      code: 'browser.getLocationAbsUrl();',
      errors: [
        {
          message: 'Unexpected browser.getLocationAbsUrl()'
        }
      ]
    },
    {
      code: 'browser.getLocationAbsUrl().then(function (url) { console.log(url) });',
      errors: [
        {
          message: 'Unexpected browser.getLocationAbsUrl()'
        }
      ]
    }
  ]
})
