'use strict'

var rule = require('../../lib/rules/no-promise-in-if')
var RuleTester = require('eslint').RuleTester
var eslintTester = new RuleTester()

eslintTester.run('no-promise-in-if', rule, {
  valid: [
    'elm.isDisplayed().then(function (isDisplayed) { if (isDisplayed) { console.log("here"); } });',
    'if (something) { console.log("here"); }',
    'if (something) { elm.isDisplayed().then(function (isDisplayed) { if (isDisplayed) { console.log("here"); } }); }',
    'if(a = isEnabled());',
    'for(;;);',
    'if(isSelected === "str" && typeof b){}',
    'if(1, isElementPresent);',
    'if(xyz === "str1" || abc==="str2" && isPresent){}'
  ],

  invalid: [
    {
      code: 'if (elm.isDisplayed()) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isDisplayed()" inside if condition'
      }]
    },
    {
      code: 'if (!elm.isEnabled()) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isEnabled()" inside if condition'
      }]
    },
    {
      code: 'if (something) {} else if (elm.isPresent()) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isPresent()" inside if condition'
      }]
    },
    {
      code: 'if (something) {} else if (!browser.isElementPresent(elm)) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isElementPresent()" inside if condition'
      }]
    },
    {
      code: 'if (something && elm.isSelected()) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isSelected()" inside if condition'
      }]
    },
    {
      code: 'if (something && (elm.isSelected() || somethingelse)) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isSelected()" inside if condition'
      }]
    },
    {
      code: 'if (something) {} else if (something && (elm.isDisplayed() || somethingelse)) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isDisplayed()" inside if condition'
      }]
    },
    {
      code: 'if (something) {} else if ((!browser.isElementPresent(elm) || somethingelse) && something) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isElementPresent()" inside if condition'
      }]
    },
    {
      code: 'if (a === elm.isDisplayed()) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isDisplayed()" inside if condition'
      }]
    },
    {
      code: 'if (!elm.isDisplayed() === b) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isDisplayed()" inside if condition'
      }]
    },
    {
      code: 'if (b = elm.isPresent()) { console.log("here"); }',
      errors: [{
        message: 'Unexpected "isPresent()" inside if condition'
      }]
    }
  ]
})
