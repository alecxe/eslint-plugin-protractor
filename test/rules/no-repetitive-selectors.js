'use strict'

var rule = require('../../lib/rules/no-repetitive-selectors')
var RuleTester = require('eslint').RuleTester
var toCode = require('../lib/join-multiline-code')

var eslintTester = new RuleTester()

eslintTester.run('no-repetitive-selectors', rule, {
  valid: [
    toCode([
      'var MyPage = function () {',
      '  this.parent = $(".container #parent");',
      '  this.child1 = this.parent.$("div:first-of-type");',
      '  this.child2 = this.parent.$("#subcontainer > .add-client");',
      '}'
    ]),
    toCode([
      'var MyPage = function () {',
      '  this.elm1 = $(".container #parent");',
      '  this.elm2 = element(by.css("#parent"));',
      '}'
    ]),
    toCode([
      'var MyPage = function () {',
      '  this.elm1 = $(".container > #parent");',
      '  this.elm2 = element(by.css(".container>#parent"));',
      '}'
    ])
  ],

  invalid: [
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.parent = $(".container");',
        '  this.child1 = $(".container div:first-of-type");',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive part of a selector detected: ".container"'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.parent = $(".container #parent");',
        '  this.child1 = $(".container #parent div:first-of-type");',
        '  this.child2 = $(".container #parent #subcontainer > .add-client");',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive part of a selector detected: ".container #parent"'
        },
        {
          message: 'Repetitive part of a selector detected: ".container #parent"'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.field1 = $(".container #parent div:first-of-type");',
        '  this.field2 = $(".container div:first-of-type");',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive part of a selector detected: ".container"'
        }
      ]
    },
    {
      code: toCode([
        'var MyPage = function () {',
        '  this.elm1 = $(".container");',
        '  this.elm2 = element(by.css(".container"));',
        '}'
      ]),
      errors: [
        {
          message: 'Repetitive part of a selector detected: ".container"'
        }
      ]
    }
  ]
})
