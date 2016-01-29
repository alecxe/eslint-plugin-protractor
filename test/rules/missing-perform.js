'use strict'

var rule = require('../../lib/rules/missing-perform')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('missing-perform', rule, {
  valid: [
    'var actions = browser.actions();',
    'var actions = browser.actions()',
    'browser.actions().click(elm).perform();',
    'browser.actions().mouseMove(elm).click().perform();',
    'browser.actions().dragAndDrop(elm1, elm2).perform();'
  ],

  invalid: [
    {
      code: 'browser.actions().click();',
      errors: [
        {
          message: 'No perform() called on browser.actions()'
        }
      ]
    },
    {
      code: 'browser.actions().mouseMove(elm);',
      errors: [
        {
          message: 'No perform() called on browser.actions()'
        }
      ]
    }
  ]
})
