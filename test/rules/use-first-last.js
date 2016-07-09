'use strict'

var rule = require('../../lib/rules/use-first-last')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('use-first-last', rule, {
  valid: [
    'element.all(by.css(".class")).first();',
    'element(by.id("id")).all(by.css(".class")).last();',
    '$$(".class").first();',
    'element(by.id("id")).$$(".class").last();',
    'element.all(by.css(".class")).get(1);',
    'element(by.id("id")).all(by.css(".class")).get(-10).getText();',
    '$$(".class").get(10);',
    'element(by.id("id")).$$(".class").get(-10);',
    'var myMap = new Map(); myMap.get(0);',
    'var myMap = new Map(); myMap.get(-1);',
    'var myMap = new Map(); myMap.get();'
  ],

  invalid: [
    {
      code: 'element.all(by.css(".class")).get(0);',
      errors: [
        {
          message: 'Unexpected "get(0)" call, use "first()" instead'
        }
      ],
      output: 'element.all(by.css(".class")).first();'
    },
    {
      code: 'element(by.id("id")).all(by.css(".class")).get(-1);',
      errors: [
        {
          message: 'Unexpected "get(-1)" call, use "last()" instead'
        }
      ],
      output: 'element(by.id("id")).all(by.css(".class")).last();'
    },
    {
      code: '$$(".class").get(0);',
      errors: [
        {
          message: 'Unexpected "get(0)" call, use "first()" instead'
        }
      ],
      output: '$$(".class").first();'
    },
    {
      code: 'element(by.id("id")).$$(".class").get(-1);',
      errors: [
        {
          message: 'Unexpected "get(-1)" call, use "last()" instead'
        }
      ],
      output: 'element(by.id("id")).$$(".class").last();'
    },
    {
      code: 'element.all(by.css(".class")).get(0).getText();',
      errors: [
        {
          message: 'Unexpected "get(0)" call, use "first()" instead'
        }
      ],
      output: 'element.all(by.css(".class")).first().getText();'
    },
    {
      code: 'element.all(by.css(".class")).get(-1).getText();',
      errors: [
        {
          message: 'Unexpected "get(-1)" call, use "last()" instead'
        }
      ],
      output: 'element.all(by.css(".class")).last().getText();'
    },
    {
      code: 'element.all(by.css(".class")).get(-1).all(by.css(".anotherclass")).get(0).getText();',
      errors: [
        {
          message: 'Unexpected "get(0)" call, use "first()" instead'
        },
        {
          message: 'Unexpected "get(-1)" call, use "last()" instead'
        }
      ],
      output: 'element.all(by.css(".class")).last().all(by.css(".anotherclass")).first().getText();'
    }
  ]
})
