'use strict'

var rule = require('../../lib/rules/limit-selector-depth')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('limit-selector-depth', rule, {
  valid: [
    'element(by.css(".myclass"));',
    'element.all(by.css(".myclass"));',
    'someOtherFunction("input[name=email]");',
    {
      options: [
        5
      ],
      code: 'element(by.css(".content > table > tbody td.cell > input#email"));'
    },
    'element(by.css("input.email.email-input.custom-input.other.classValue"));',
    {
      options: [
        1
      ],
      code: '$(".content");'
    },
    '$$("");',
    '$();'
  ],

  invalid: [
    {
      code: 'element(by.css(".content > table > tbody > tr:nth-child(2) > td.cell > input#email"));',
      errors: [
        {
          message: 'CSS selector has too many nodes.'
        }
      ]
    },
    {
      code: 'element(by.css("div div div div div div"));',
      errors: [
        {
          message: 'CSS selector has too many nodes.'
        }
      ]
    },
    {
      code: 'element(by.css("div > div > div > div > div > div"));',
      errors: [
        {
          message: 'CSS selector has too many nodes.'
        }
      ]
    },
    {
      options: [
        1
      ],
      code: '$(".content > table");',
      errors: [
        {
          message: 'CSS selector has too many nodes.'
        }
      ]
    },
    {
      options: [
        0
      ],
      code: '$(".content");',
      errors: [
        {
          message: 'CSS selector has too many nodes.'
        }
      ]
    },
    {
      options: [
        4
      ],
      code: '$$(".content > table > tbody td.cell > input#email");',
      errors: [
        {
          message: 'CSS selector has too many nodes.'
        }
      ]
    }
  ]
})
