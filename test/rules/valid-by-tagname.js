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
    'element(by.tagName("H1"));',
    'element(by.tagName("my-custom-tag"));'
  ],

  invalid: [
    {
      code: 'element(by.tagName("_customTagName"));',
      errors: [{
        message: 'Invalid TagName value: "_customTagName"'
      }]
    },
    {
      code: 'element(by.tagName("div.classname"));',
      errors: [{
        message: 'Invalid TagName value: "div.classname"'
      }]
    },
    {
      code: 'element(by.tagName("blockquote:"));',
      errors: [{
        message: 'Invalid TagName value: "blockquote:"'
      }]
    },
    {
      code: 'element(by.tagName("multiple tagnames"));',
      errors: [{
        message: 'Invalid TagName value: "multiple tagnames"'
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
    },
    {
      code: 'element(by.tagName("12345"));',
      errors: [{
        message: 'Invalid TagName value: "12345"'
      }]
    },
    {
      code: 'element(by.tagName("-"));',
      errors: [{
        message: 'Invalid TagName value: "-"'
      }]
    },
    {
      code: 'element(by.tagName("customtag-"));',
      errors: [{
        message: 'Invalid TagName value: "customtag-"'
      }]
    }
  ]
})
