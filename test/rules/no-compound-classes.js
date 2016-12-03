'use strict'

var rule = require('../../lib/rules/no-compound-classes')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-compound-classes', rule, {
  valid: [
    'element(by.css("tag1 tag2"));',
    'element(by.css(".class1"));',
    'element(by.className("class1"));',
    'element.all(by.className("somevalue"));',
    'element.all(by.css("tag1 tag2"));',
    '$("tag1 tag2");',
    '$$("tag1 tag2");',
    'element.all(by.className());',
    'element(by.className(""));',
    'by.className();',
    'someotherfunction()'
  ],

  invalid: [
    {
      code: 'element(by.className("class1 class2"));',
      errors: [
        {
          message: 'No compound class names allowed.'
        }
      ]
    },
    {
      code: 'element.all(by.className("class1 class2"));',
      errors: [
        {
          message: 'No compound class names allowed.'
        }
      ]
    },
    {
      code: 'element.all(by.className("class1 class2 class3"));',
      errors: [
        {
          message: 'No compound class names allowed.'
        }
      ]
    },
    {
      code: 'element(by.id("myid")).all(by.className("class1 class2 class3"));',
      errors: [
        {
          message: 'No compound class names allowed.'
        }
      ]
    },
    {
      code: 'element(by.id("myid")).element(by.className("class1 class2 class3"));',
      errors: [
        {
          message: 'No compound class names allowed.'
        }
      ]
    }
  ]
})
