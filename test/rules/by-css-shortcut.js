'use strict'

var rule = require('../../lib/rules/by-css-shortcut')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('by-css-shortcut', rule, {
  valid: [
    '$("a[href^=something]");',
    '$$("a[href^=something]");',
    'element(by.id("id")).$(".class");',
    'element(by.id("id")).$$(".class");'
  ],

  invalid: [
    {
      code: 'element(by.css(".class"));',
      errors: [
        {
          message: 'Unexpected element(by.css()), use $ shortcut instead'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class"));',
      errors: [
        {
          message: 'Unexpected element.all(by.css()), use $$ shortcut instead'
        }
      ]
    },
    {
      code: 'element(by.id("id")).element(by.css(".class"));',
      errors: [
        {
          message: 'Unexpected element(by.css()), use $ shortcut instead'
        }
      ]
    },
    {
      code: 'element(by.id("id")).all(by.css(".class"));',
      errors: [
        {
          message: 'Unexpected element.all(by.css()), use $$ shortcut instead'
        }
      ]
    }
  ]
})
