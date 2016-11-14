'use strict'

var rule = require('../../lib/rules/valid-locator-type')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('valid-locator-type', rule, {
  valid: [
    'element(by.css(".class"));',
    'element.all(by.css(".class"));',
    '$(".class");',
    '$$(".class");',
    'element(by.css(".class1")).element(by.css(".class2"));',
    'element(by.css(".class1")).all(by.css(".class2"));',
    'element.all(by.css(".class1")).all(by.css(".class2"));',
    '$(".class1").all(by.css(".class2"));',
    '$(".class1").element(by.css(".class2"));',
    '$$(".class1").all(by.css(".class2"));',
    '$(".class1").$(".class2");',
    '$(".class1").$$(".class2");',
    '$$(".class1").$$(".class2");',
    'element();',
    'element(somevariable);',
    'element.all();',
    'element.all(somevariable);',
    '$$(".class1").$$();',
    '$$(".class1").$$(somevariable);',
    '$();',
    '$(somevariable);'
  ],

  invalid: [
    {
      code: 'element(".class");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: 'element.all(".class");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$(by.css(".class"));',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$$(by.css(".class"));',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: 'element(by.css(".class1")).element(".class2");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: 'element(by.css(".class1")).all(".class2");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$(".class1").all(".class2");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$(".class1").element(".class2");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$$(".class1").all(".class2");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$(".class1").$(by.css(".class2"));',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$(".class1").$$(by.css(".class2"));',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$$(".class1").$$(by.css(".class2"));',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$$(".class1").all(by.css(".class2")).all(".class3");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class1")).all(".class2");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: '$$(".class1").all(".class2");',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class1")).$$(by.css(".class2"));',
      errors: [
        {
          message: 'Invalid locator type.'
        }
      ]
    }
  ]
})
