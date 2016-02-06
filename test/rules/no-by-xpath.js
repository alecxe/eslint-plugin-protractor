'use strict'

var rule = require('../../lib/rules/no-by-xpath')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-by-xpath', rule, {
  valid: [
    'element(by.css("a[href^=something]"));',
    'element.all(by.css("a[href^=something]"));',
    'SomeObject.xpath(10);'
  ],

  invalid: [
    {
      code: 'element(by.xpath("//a[starts-with(@href, \'something\')]"));',
      errors: [
        {
          message: 'Unexpected by.xpath()'
        }
      ]
    },
    {
      code: 'element.all(by.xpath("//a[starts-with(@href, \'something\')]"));',
      errors: [
        {
          message: 'Unexpected by.xpath()'
        }
      ]
    }
  ]
})
