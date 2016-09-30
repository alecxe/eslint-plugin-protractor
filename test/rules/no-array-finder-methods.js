'use strict'

var rule = require('../../lib/rules/no-array-finder-methods')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-array-finder-methods', rule, {
  valid: [
    'element.all(by.css(".class")).get(0);',
    '$$(".class").first();',
    'element.all(by.css(".class")).last();',
    'element.all(by.css(".class")).map(function (elm) {});',
    '$$(".class").filter(function (elm) {});',
    'element.all(by.css(".class")).each(function (elm) {});',
    'element(by.css(".class1")).element.all(by.css(".class2")).first();',
    'element(by.css(".class1")).$$(".class2").first();',
    '$(".class1").element.all(by.css(".class2")).first();',
    '$(".class1").$$(".class2").first();'
  ],

  invalid: [
    {
      code: 'element(by.css(".class")).get(0);',
      errors: [
        {
          message: 'Unexpected "get()" call on ElementFinder'
        }
      ]
    },
    {
      code: '$(".class").first();',
      errors: [
        {
          message: 'Unexpected "first()" call on ElementFinder'
        }
      ]
    },
    {
      code: 'element(by.css(".class")).last();',
      errors: [
        {
          message: 'Unexpected "last()" call on ElementFinder'
        }
      ]
    },
    {
      code: 'element(by.css(".class")).map(function (elm) {});',
      errors: [
        {
          message: 'Unexpected "map()" call on ElementFinder'
        }
      ]
    },
    {
      code: '$(".class").filter(function (elm) {});',
      errors: [
        {
          message: 'Unexpected "filter()" call on ElementFinder'
        }
      ]
    },
    {
      code: 'element(by.css(".class")).each(function (elm) {});',
      errors: [
        {
          message: 'Unexpected "each()" call on ElementFinder'
        }
      ]
    },
    {
      code: 'element(by.css(".class1")).element(by.css(".class2")).first();',
      errors: [
        {
          message: 'Unexpected "first()" call on ElementFinder'
        }
      ]
    },
    {
      code: 'element(by.css(".class1")).$(".class2").first();',
      errors: [
        {
          message: 'Unexpected "first()" call on ElementFinder'
        }
      ]
    },
    {
      code: '$(".class1").element(by.css(".class2")).first();',
      errors: [
        {
          message: 'Unexpected "first()" call on ElementFinder'
        }
      ]
    },
    {
      code: '$(".class1").$(".class2").first();',
      errors: [
        {
          message: 'Unexpected "first()" call on ElementFinder'
        }
      ]
    }
  ]
})
