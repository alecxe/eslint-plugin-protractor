'use strict'

var rule = require('../../lib/rules/no-get-inner-outer-html')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-get-inner-outer-html', rule, {
  valid: [
    'expect(element(by.id("myid")).getText()).toEqual("test");',
    'getInnerHtml();',
    'var html = getOuterHtml();',
    'elm.getInnerHtml();',
    'elm.getOuterHtml();'
  ],

  invalid: [
    {
      code: 'expect(element(by.id("myid")).getInnerHtml()).toEqual("test");',
      errors: [
        {
          message: 'Unexpected "getInnerHtml()"'
        }
      ]
    },
    {
      code: 'expect(element(by.id("myid")).getOuterHtml()).toEqual("test");',
      errors: [
        {
          message: 'Unexpected "getOuterHtml()"'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class")).get(1).getOuterHtml();',
      errors: [
        {
          message: 'Unexpected "getOuterHtml()"'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class")).first().getOuterHtml();',
      errors: [
        {
          message: 'Unexpected "getOuterHtml()"'
        }
      ]
    },
    {
      code: 'element(by.id("id")).all(by.css(".class")).last().getInnerHtml();',
      errors: [
        {
          message: 'Unexpected "getInnerHtml()"'
        }
      ]
    },
    {
      code: '$$(".class").first().getOuterHtml();',
      errors: [
        {
          message: 'Unexpected "getOuterHtml()"'
        }
      ]
    },
    {
      code: '$(".class").getInnerHtml().then(function (html) { console.log(html) });',
      errors: [
        {
          message: 'Unexpected "getInnerHtml()"'
        }
      ]
    }
  ]
})
