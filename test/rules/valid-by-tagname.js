'use strict'

var rule = require('../../lib/rules/valid-by-tagname')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('valid-by-tagname', rule, {
  valid: [
    'element(by.tagName("a"));',
    'element(by.tagName("b"));',
    'element(by.tagName("i"));',
    'element(by.tagName("A"));',
    'element(by.tagName("Area"));',
    'element(by.tagName("BlockQuote"));',
    'element(by.tagName("h1"));',
    'element(by.tagName("H1"));'
  ],

  invalid: [
    {
      code: 'element(by.tagName("customTagName"));',
      errors: [{
        message: 'Invalid TagName value: "customTagName"'
      }]
    },
    {
      code: 'element(by.tagName("div.classname"));',
      errors: [{
        message: 'Invalid TagName value: "div.classname"'
      }]
    },
    {
      code: 'element(by.tagName("_blockquote"));',
      errors: [{
        message: 'Invalid TagName value: "_blockquote"'
      }]
    },
    {
      code: 'element(by.tagName("divs"));',
      errors: [{
        message: 'Invalid TagName value: "divs"'
      }]
    },
    {
      code: 'element(by.tagName(\'option[value="Test"]\'));',
      errors: [{
        message: 'Invalid TagName value: "option[value="Test"]"'
      }]
    },
    {
      code: 'element(by.tagName(" div "));',
      errors: [{
        message: 'Invalid TagName value: " div "'
      }]
    }
  ]
})
