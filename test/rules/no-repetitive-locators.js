'use strict'

var rule = require('../../lib/rules/no-repetitive-locators')
var RuleTester = require('eslint').RuleTester
var toCode = require('../lib/join-multiline-code')

var eslintTester = new RuleTester()

eslintTester.run('no-repetitive-locators', rule, {
  valid: [
    toCode([
      'var MyPage = function () {',
      '  this.grids = element.all(by.css(".mygrid"));',
      '  this.firstGrid = this.grids.first();',
      '}'
    ]),
    toCode([
      'var MyPage = function () {',
      '  this.parent = $(".container #parent");',
      '  this.child1 = this.parent.$("div:first-of-type");',
      '  this.child2 = this.parent.$("#subcontainer > .add-client");',
      '}'
    ]),
    {
      code: toCode([
        'class Helper {',
        '  getChild(locatorOrSelector) {',
        '    return this.element.$(locatorOrSelector);',
        '  }',

        '  getChildren(locatorOrSelector) {',
        '    return this.element.$$(locatorOrSelector);',
        '  }',
        '}'
      ]),
      parserOptions: { ecmaVersion: 6 }
    }
  ],

  invalid: [
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.grids = element.all(by.css(".mygrid"));',
        '  this.firstGrid = element.all(by.css(".mygrid")).first();',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive locator detected'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.grids = $$(".mygrid");',
        '  this.firstGrid = $$(".mygrid").first();',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive locator detected'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.grids = $$(".mygrid");',
        '  this.firstGrid = $(".mygrid")',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive locator detected'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.grids = element.all(by.css(".mygrid"));',
        '  this.firstGrid = $(".mygrid")',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive locator detected'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.grids = $$(".mygrid");',
        '  this.firstGrid = element(by.css(".mygrid"))',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive locator detected'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.grids = element.all(by.className("test"));',
        '  this.firstGrid = element(by.css(".container")).all(by.className("test")).first()',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive locator detected'
        }
      ]
    }
  ]
})
