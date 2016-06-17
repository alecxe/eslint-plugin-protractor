'use strict'

var rule = require('../../lib/rules/no-angular-classes')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-angular-classes', rule, {
  valid: [
    'element(by.css(".myclass"));',
    'element.all(by.css(".myclass"));',
    '$(".myclass");',
    '$$(".myclass");',
    '$("[class=\'myclass\']");',
    '$$("[class*=\'myclass\']");',
    '$(".myclass.myotherclass");',
    '$$(".myotherclass.myclass");',
    '$("input.myclass");',
    'var s = "ng-scope";',
    'element(by.id("ng-isolate-scope"));',
    '$();',
    '$$();',
    'element(by.css());',
    'element.all(by.css());'
  ],

  invalid: [
    {
      code: 'element(by.css(".ng-scope"));',
      errors: [
        {
          message: 'Unexpected Angular class "ng-scope" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element.all(by.css(".ng-isolate-scope"));',
      errors: [
        {
          message: 'Unexpected Angular class "ng-isolate-scope" inside a CSS selector'
        }
      ]
    },
    {
      code: '$(".ng-binding");',
      errors: [
        {
          message: 'Unexpected Angular class "ng-binding" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$(".ng-valid");',
      errors: [
        {
          message: 'Unexpected Angular class "ng-valid" inside a CSS selector'
        }
      ]
    },
    {
      code: '$("[class=\'ng-invalid\']");',
      errors: [
        {
          message: 'Unexpected Angular class "ng-invalid" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("[class*=\'ng-pristine\']");',
      errors: [
        {
          message: 'Unexpected Angular class "ng-pristine" inside a CSS selector'
        }
      ]
    },
    {
      code: '$(".myclass.ng-dirty");',
      errors: [
        {
          message: 'Unexpected Angular class "ng-dirty" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$$(".ng-touched.myclass");',
      errors: [
        {
          message: 'Unexpected Angular class "ng-touched" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$("input.ng-untouched");',
      errors: [
        {
          message: 'Unexpected Angular class "ng-untouched" inside a CSS selector'
        }
      ]
    }
  ]
})
