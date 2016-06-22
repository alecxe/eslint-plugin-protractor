'use strict'

var rule = require('../../lib/rules/no-shadowing')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-shadowing', rule, {
  valid: [
    'var element2 = "something";',
    'element(by.id("test"));',
    'var EC = protractor.ExpectedConditions;',
    'var elm = $(".myclass");',
    'var elements = $$(".myclass");',
    'for (var i = 0; i < variables.length; ++i) {}',
    'try { json = JSON.parse(input) } catch (e) {}',
    'switch (a) { case 1: break; default: break; }'
  ],

  invalid: [
    {
      code: 'var element = "something";',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'function test (browser) {};',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'var protractor;',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'function by () {};',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'var $ = 1;',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'var a = 2, $$ = 3;',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'for (var by = 0; by < 10; ++by) {}',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'try { json = JSON.parse(input) } catch (browser) {}',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    },
    {
      code: 'switch (element) { case 1: break; default: break; }',
      errors: [
        {
          message: 'Unexpected Protractor built-in global variable shadowing'
        }
      ]
    }
  ]
})
