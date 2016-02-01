'use strict'

var rule = require('../../lib/rules/no-browser-sleep')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-browser-sleep', rule, {
  valid: [
    'SomeObject.sleep(10);',
    'browser.wait(EC.visibilityOf(elm), 5000, "Message");'
  ],

  invalid: [
    {
      code: 'browser.sleep(10);',
      errors: [
        {
          message: 'Unexpected browser.sleep()'
        }
      ]
    },
    {
      code: 'browser.sleep(10000);',
      errors: [
        {
          message: 'Unexpected browser.sleep()'
        }
      ]
    }
  ]
})
