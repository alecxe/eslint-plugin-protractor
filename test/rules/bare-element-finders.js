'use strict'

var rule = require('../../lib/rules/bare-element-finders')
var RuleTester = require('eslint').RuleTester

var eslintTester = new RuleTester()

eslintTester.run('bare-element-finders', rule, {
  valid: [
    '',
    'all()',
    'test.all()',
    '$$',
    'var myElement = element(by.id("signin_submit_btn"));',
    'var myElements = element.all(by.className("myClass"));',
    'var myElement = $("#signin_submit_btn");',
    'var myElements = $$(".myClass");',
    'element(by.id("signin_submit_btn")).click();',
    'element.all(by.className("myClass")).first().click();',
    'element.all(by.css(".class")).get(0).sendKeys("test");',
    '$(".class").sendKeys("test");',
    '$$(".class").first().sendKeys("test");',
    'element.all(by.css(".class")).last().click();',
    'element(by.css(".class1")).element(by.css(".class2")).click();',
    'element(by.css(".class1")).$(".class2").sendKeys("test");',
    '$$(".class1").first().element(by.css(".class2")).sendKeys("test");',
    '$(".class1").$(".class2").sendKeys("test");',
    'function test() { return q.all([promise1, promise2]); }',
    'function test() { return element(by.id("signin_submit_btn")); }',
    'function test() { return element.all(by.css("class1")); }',
    'function test() { return $$("class1"); }',
    'function test() { return $("class1"); }'
  ],

  invalid: [
    {
      code: 'element(by.id("signin_submit_btn"));',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'function test() { element(by.id("signin_submit_btn")); }',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'element.all(by.className("myClass"));',
      errors: [
        {
          message: 'Bare ElementArrayFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class")).get(0);',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: '$(".class");',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: '$$(".class").first();',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'element.all(by.css(".class")).last();',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'element(by.css(".class1")).element(by.css(".class2"));',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'element(by.css(".class1")).$(".class2");',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: '$$(".class1").first().element(by.css(".class2"));',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: '$(".class1").$(".class2");',
      errors: [
        {
          message: 'Bare ElementFinder with no applied action detected.'
        }
      ]
    },
    {
      code: '$(".class1").$$(".class2");',
      errors: [
        {
          message: 'Bare ElementArrayFinder with no applied action detected.'
        }
      ]
    },
    {
      code: '$$(".class1").$$(".class2").all(by.className("class3"));',
      errors: [
        {
          message: 'Bare ElementArrayFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'element.all(by.className("class3")).$$(".class4");',
      errors: [
        {
          message: 'Bare ElementArrayFinder with no applied action detected.'
        }
      ]
    },
    {
      code: 'element(by.id("id1")).element(by.id("id2")).$$(".class4");',
      errors: [
        {
          message: 'Bare ElementArrayFinder with no applied action detected.'
        }
      ]
    }
  ]
})
