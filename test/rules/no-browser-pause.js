'use strict'

var rule = require('../../lib/rules/no-browser-pause')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-browser-pause', rule, {
  valid: [
    'browser.notPause()'
  ],

  invalid: [
    {
      code: 'browser.pause();',
      errors: [
        {
          message: 'Unexpected browser.pause()'
        }
      ]
    }
  ]
})
