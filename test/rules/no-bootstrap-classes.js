'use strict'

var rule = require('../../lib/rules/no-bootstrap-classes')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-bootstrap-classes', rule, {
  valid: [
    'element(by.css(".myclass"));',
    'element.all(by.css(".myclass"));',
    '$(".myclass");',
    '$$(".myclass");',
    '$("[class=\'myclass\']");',
    '$$("[class*=\'myclass\']");',
    '$(".myclass.myotherclass");',
    '$$(".myotherclass.myclass");',
    '$("input.myclass");',
    'var s = "col-lg-offset-11";',
    'element(by.id("col-lg-12"));',
    '$();',
    '$$();',
    'element(by.css());',
    'element.all(by.css());',
    '$("p:first-child");',
    '$("p::first-line");',
    '$("invalid::selector()");',
    '$("a[href^=/], .container:has(nav) > a[href]:lt($var)");',
    '$$("//somethinginvalid[@attr=\'test\']")',
    'element(by.css("a[href]"));',
    '$("");'
  ],

  invalid: [
    {
      code: 'element(by.css(".col-lg-12"));',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-12" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element.all(by.css(".col-lg-offset-11"));',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-offset-11" inside a CSS selector'
        }
      ]
    },
    {
      code: '$(".col-sm-11");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-sm-11" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$(".col-sm-push-4");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-sm-push-4" inside a CSS selector'
        }
      ]
    },
    {
      code: '$("[class=\'col-md-10\']");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-md-10" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("[class*=\'col-md-offset-4\']");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-md-offset-4" inside a CSS selector'
        }
      ]
    },
    {
      code: '$(".myclass.col-lg-pull-8");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-pull-8" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$$(".col-lg-offset-8.myclass");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-offset-8" inside a CSS selector'
        }
      ]
    },
    {
      code: 'element(by.id("id")).$("input.col-lg-pull-8");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-pull-8" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$(".col-lg-pull-8,[class*=\'col-md-offset-4\']");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-md-offset-4" inside a CSS selector'
        },
        {
          message: 'Unexpected Bootstrap class "col-lg-pull-8" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("#myid input.col-lg-pull-8");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-pull-8" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("#myid .myclass input.col-lg-pull-8");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-pull-8" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("#myid .myclass input.myclass1,[class=col-lg-pull-8]");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-pull-8" inside a CSS selector'
        }
      ]
    },
    {
      code: '$$("input.myclass1,[class=col-lg-pull-8] #myid .myclass");',
      errors: [
        {
          message: 'Unexpected Bootstrap class "col-lg-pull-8" inside a CSS selector'
        }
      ]
    }
  ]
})
