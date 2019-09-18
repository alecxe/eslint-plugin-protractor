'use strict'

var rule = require('../../lib/rules/empty-script')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('empty-script', rule, {
  valid: [
    'browser.executeScript("var a = 1;");',
    'browser.executeAsyncScript("var a = 1;");',
    'var tag = browser.executeScript("return arguments[0].tagName", el);',
    'browser.executeAsyncScript("var callback = arguments[arguments.length - 1];");',
    'var script = "var a = 1"; browser.executeScript(clientScript);',
    'function clientScript(){ return 1; }; browser.executeScript(clientScript);'
  ],

  invalid: [
    {
      code: 'browser.executeScript();',
      errors: [{
        message: 'executeScript() call without arguments'
      }]
    },
    {
      code: 'browser.executeAsyncScript();',
      errors: [{
        message: 'executeAsyncScript() call without arguments'
      }]
    },
    {
      code: 'browser.executeScript("");',
      errors: [{
        message: 'executeScript() called with an empty script'
      }]
    },
    {
      code: 'browser.executeAsyncScript("");',
      errors: [{
        message: 'executeAsyncScript() called with an empty script'
      }]
    }
  ]
})
