'use strict'

var rule = require('../../lib/rules/valid-by-id')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('valid-by-id', rule, {
  valid: [
    'element(by.id("validID"));',
    'element(by.css(".myclass"));',
    'element.all(by.id("simpleid"));',
    'element.all(by.id("foo-bar"));',
    'element.all(by.id("foo:bar"));',
    'element.all(by.id("foo_bar"));',
    'element.all(by.id("foo.bar"));',
    'element.all(by.id("a123456789"));',
    'element.all(by.id("a1-_:.r2D2"));'
  ],

  invalid: [
    {
      code: 'element(by.id("#id"));',
      errors: [{
        message: 'Invalid ID value: "#id"'
      }]
    },
    {
      code: 'element(by.id("1startwithnumber"));',
      errors: [{
        message: 'Invalid ID value: "1startwithnumber"'
      }]
    },
    {
      code: 'element(by.id("_"));',
      errors: [{
        message: 'Invalid ID value: "_"'
      }]
    },
    {
      code: 'element(by.id("#"));',
      errors: [{
        message: 'Invalid ID value: "#"'
      }]
    },
    {
      code: 'element(by.id("invalid*id"));',
      errors: [{
        message: 'Invalid ID value: "invalid*id"'
      }]
    },
    {
      code: 'element(by.id("id with spaces"));',
      errors: [{
        message: 'Invalid ID value: "id with spaces"'
      }]
    }
  ]
})
