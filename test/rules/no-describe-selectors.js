'use strict'

/**
 * @fileoverview Discourage use of selectors within describe blocks.
 * @author David Adams
 */

var rule = require('../../lib/rules/no-describe-selectors')
var RuleTester = require('eslint').RuleTester
var eslintTester = new RuleTester()

eslintTester.run('no-describe-selectors', rule, {
  valid: [
    'var PageObject = function () { this.getDOMElement = function () { return element(by.css(".some-element")); }; }',
    'module.exports = { getDOMElement: function () { return element(by.css(".some-element")); } };'
  ],

  invalid: [
    {
      code: 'describe(function () { element(by.addLocator("newLocator", function () { } )); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () {element(by.binding("something.binding")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.model("something.model")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.buttonText("buttonText")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.partialButtonText("partialButtonText")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.repeater("something in repeater")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.cssContainingText(".css", "Contained text")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.options("o for o in options")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.deepCss(".deepCss")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.className("className")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },

    {
      code: 'describe(function () { element(by.css(".css")); })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.id("id")) })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.linkText("linkText")) })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.js("js")) })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.name("name")) })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.partialLinkText("partialLinkText")) })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.tagName("tagName")) })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    },
    {
      code: 'describe(function () { element(by.xpath("//xpath")) })',
      errors: [{
        message: 'Unexpected selector in describe block'
      }]
    }
  ]
})
