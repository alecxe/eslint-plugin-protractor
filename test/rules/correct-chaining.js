'use strict'

var rule = require('../../lib/rules/correct-chaining')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('correct-chaining', rule, {
  valid: [
    'element(by.css(".parent")).all(by.css(".child"));',
    '$(".parent").all(by.css(".child"));',
    'element.all(by.css(".child")).first().all(by.css(".child"));',
    '$$(".parent").first().all(by.css(".child"));',
    'element(by.css(".parent")).element(by.css(".child"));',
    'element(by.css(".parent"))',
    'element.all(by.css(".child"))',
    'element.all(by.css(".parent")).all(by.css(".child"))'
  ],

  invalid: [
    {
      code: 'element(by.css(".parent")).element.all(by.css(".child"));',
      errors: [
        {
          message: 'Incorrect "element" and "element.all" chaining detected'
        }
      ],
      output: 'element(by.css(".parent")).all(by.css(".child"));'
    },
    {
      code: '$(".parent").element.all(by.css(".child"));',
      errors: [
        {
          message: 'Incorrect "element" and "element.all" chaining detected'
        }
      ],
      output: '$(".parent").all(by.css(".child"));'
    },
    {
      code: 'element.all(by.css(".child")).first().element.all(by.css(".child"));',
      errors: [
        {
          message: 'Incorrect "element" and "element.all" chaining detected'
        }
      ],
      output: 'element.all(by.css(".child")).first().all(by.css(".child"));'
    },
    {
      code: '$$(".parent").first().element.all(by.css(".child"));',
      errors: [
        {
          message: 'Incorrect "element" and "element.all" chaining detected'
        }
      ],
      output: '$$(".parent").first().all(by.css(".child"));'
    }
  ]
})
