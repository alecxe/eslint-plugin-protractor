'use strict'

var rule = require('../../lib/rules/no-get-raw-id')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('no-get-raw-id', rule, {
  valid: [
    'expect(element(by.id("myid")).getId()).toEqual("id");',
    'getRawId();',
    'var html = getRawId();',
    'elm.getRawId();',
    'elm.getOuterHTML();'
  ],

  invalid: [
    {
      code: 'expect(element(by.id("myid")).getRawId()).toEqual("id");',
      errors: [
        {
          message: 'Unexpected "getRawId()". Use "getId()" instead'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class")).get(1).getRawId();',
      errors: [
        {
          message: 'Unexpected "getRawId()". Use "getId()" instead'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class")).first().getRawId();',
      errors: [
        {
          message: 'Unexpected "getRawId()". Use "getId()" instead'
        }
      ]
    },
    {
      code: 'element(by.id("id")).all(by.css(".class")).last().getRawId();',
      errors: [
        {
          message: 'Unexpected "getRawId()". Use "getId()" instead'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class")).first().$$(".myclass").last().getRawId();',
      errors: [
        {
          message: 'Unexpected "getRawId()". Use "getId()" instead'
        }
      ]
    },
    {
      code: '$$(".class").first().getRawId();',
      errors: [
        {
          message: 'Unexpected "getRawId()". Use "getId()" instead'
        }
      ]
    },
    {
      code: '$(".class").getRawId().then(function (id) { console.log(id) });',
      errors: [
        {
          message: 'Unexpected "getRawId()". Use "getId()" instead'
        }
      ]
    }
  ]
})
