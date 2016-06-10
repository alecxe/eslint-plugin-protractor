'use strict'

var rule = require('../../lib/rules/use-simple-repeaters')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('use-simple-repeaters', rule, {
  valid: [
    'element.all(by.repeater("item in items"));',
    'element.all(by.exactRepeater("item in items"));'
  ],

  invalid: [
    {
      code: 'element.all(by.repeater("item in items | filter : x | orderBy : order | limitTo : limit as results"));',
      errors: [
        {
          message: 'Unexpected filter inside a by.repeater() locator.'
        }
      ]
    },
    {
      code: 'element.all(by.repeater("item in items | filter:searchTerm"));',
      errors: [
        {
          message: 'Unexpected filter inside a by.repeater() locator.'
        }
      ]
    },
    {
      code: 'element.all(by.repeater("item in items track by $index"));',
      errors: [
        {
          message: 'Unexpected "track by" inside a by.repeater() locator.'
        }
      ]
    }
  ]
})
