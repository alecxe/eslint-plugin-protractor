'use strict'

var rule = require('../../lib/rules/missing-wait-message')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('missing-wait-message', rule, {
  valid: [
    'browser.wait(EC.presenceOf(elm), 5000, \'The user menu is not present\');',
    'browser.wait(EC.elementToBeClickable(elm), 5000, \'The submit button has not become clickable. Watch for the modal popup not to be opened\');'
  ],

  invalid: [
    {
      code: 'browser.wait(EC.presenceOf(elm), 5000);',
      errors: [
        {
          message: 'No timeout message provided for browser.wait()'
        }
      ]
    },
    {
      code: 'browser.wait(EC.visibilityOf(elm), 5000);',
      errors: [
        {
          message: 'No timeout message provided for browser.wait()'
        }
      ]
    }
  ]
})
