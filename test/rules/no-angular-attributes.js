'use strict'

var rule = require('../../lib/rules/no-angular-attributes')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-angular-attributes', rule, {
  valid: [
    'element(by.css("input"));',
    'element(by.css("[ng-show"));',
    'element.all(by.css(".container"));',
    '$(".show");',
    '$$(".hide");',
    '$("[cloak]");',
    '$("[test-ng-cloak]");',
    '$$("a[href^=/], .container:has(nav)");',
    '$("a[href^=/], .container");',
    'element(by.id("id")).$$("a[href^=/]");',
    'element(by.id("id")).$("input");',
    'var s = "ng-cloak";',
    'element(by.id("data-ng-pattern"));',
    '$("");',
    '$();',
    '$$();',
    'element(by.css());',
    'element.all(by.css());'
  ],

  invalid: [
    {
      code: 'element(by.css("[ng-show=test]"));',
      errors: [
        {
          message: 'Unexpected Angular attribute "ng-show" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element.all(by.css("[ng-hide]"));',
      errors: [
        {
          message: 'Unexpected Angular attribute "ng-hide" inside a CSS selector'
        }
      ]
    },
    {
      code: '$("[ng-src*=test]");',
      errors: [
        {
          message: 'Unexpected Angular attribute "ng-src" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("[x-ng-href$=com]");',
      errors: [
        {
          message: 'Unexpected Angular attribute "x-ng-href" inside a CSS selector'
        }
      ]
    },
    {
      code: '$("[data-ng-cloak]");',
      errors: [
        {
          message: 'Unexpected Angular attribute "data-ng-cloak" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("a[href^=/], .container:has(nav) > [ng-focus]");',
      errors: [
        {
          message: 'Unexpected Angular attribute "ng-focus" inside a CSS selector'
        }
      ]
    },
    {
      code: '$("a[href^=/], [ng-init*=\'test\'] > .container");',
      errors: [
        {
          message: 'Unexpected Angular attribute "ng-init" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$$("[ng-blur^=expression], a[href^=/]");',
      errors: [
        {
          message: 'Unexpected Angular attribute "ng-blur" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$("[data-ng-pattern*=\'test\']");',
      errors: [
        {
          message: 'Unexpected Angular attribute "data-ng-pattern" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$("[ng-show][data-ng-src]");',
      errors: [
        {
          message: 'Unexpected Angular attribute "ng-show" inside a CSS selector'
        },
        {
          message: 'Unexpected Angular attribute "data-ng-src" inside a CSS selector'
        }
      ]
    }
  ]
})
