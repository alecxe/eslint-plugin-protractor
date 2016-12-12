'use strict'

var rule = require('../../lib/rules/use-count-method')
var RuleTester = require('eslint').RuleTester
var toCode = require('../lib/join-multiline-code')

var eslintTester = new RuleTester()

eslintTester.run('use-count-method', rule, {
  valid: [
    toCode([
      'expect(element.all(by.repeater("product in products")).count()).toBeGreaterThan(1);'
    ]),
    toCode([
      'var products = [];',
      'console.log(products.length);'
    ]),
    toCode([
      'element.all(by.repeater("product in products")).then(function (products) {',
      '    console.log("test");',
      '});'
    ]),
    toCode([
      'element.all(by.repeater("product in products")).then(function (products) {',
      '    var testArray = [1, 2, 3];',
      '    expect(testArray.length).toEqual(3)',
      '});'
    ]),
    toCode([
      'element.all(by.repeater("product in products")).then(function (products) {',
      '    var testArray = [1, 2, 3];',
      '    expect(3).toEqual(testArray.length)',
      '});'
    ]),
    toCode([
      'element.all(by.repeater("product in products")).then(function () {',
      '});'
    ]),
    toCode([
      'element.all(by.repeater("product in products")).then(function () {',
      '    var testArray = [1, 2, 3];',
      '    expect(3).toEqual(testArray.length)',
      '});'
    ]),
    toCode([
      'element.all(by.repeater("product in products")).filter(function (elm) {',
      '    return true;',
      '});'
    ]),
    toCode([
      'element.all(by.repeater("product in products")).then(console.log);'
    ]),
    toCode([
      'somePromise.then(function (products) {',
      '    expect(products.length).toEqual(1);',
      '});'
    ]),
    toCode([
      'then(function (products) {',
      '    expect(products.length).toEqual(1);',
      '});'
    ]),
    toCode([
      'var products = [1, 2, 3];',
      'element.all(by.repeater("product in products")).then(function () {',
      '    expect(products.length).toEqual(1);',
      '});'
    ]),
    toCode([
      'promise.method().then(function (products) {',
      '    expect(products.length).toEqual(1);',
      '});'
    ])
    // TODO: promise.all().then() - recognized as an ElementArrayFinder!
    // TODO: run against ap-ui-html
  ],

  invalid: [
    {
      code: toCode([
        'element.all(by.repeater("product in products")).then(function (products) {',
        '    expect(products.length >= 1).toBeTruthy();',
        '});'
      ]),
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    },
    {
      code: toCode([
        'element.all(by.repeater("product in products")).then((products) => {',
        '    expect(products.length >= 1).toBeTruthy();',
        '});'
      ]),
      parserOptions: {
        ecmaVersion: 6
      },
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    },
    {
      code: toCode([
        'element.all(by.repeater("product in products")).then(function (products) {',
        '    expect(1).toEqual(products.length);',
        '});'
      ]),
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    },
    {
      code: toCode([
        'element.all(by.repeater("product in products")).then((products) => {',
        '    expect(1).toEqual(products.length);',
        '});'
      ]),
      parserOptions: {
        ecmaVersion: 6
      },
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    },
    {
      code: toCode([
        'element.all(by.repeater("product in products")).then(function (products) {',
        '    expect(products.length).toEqual(products.length);',
        '});'
      ]),
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        },
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    },
    {
      code: toCode([
        'element.all(by.repeater("product in products")).then((products) => {',
        '    expect(products.length).toEqual(products.length);',
        '});'
      ]),
      parserOptions: {
        ecmaVersion: 6
      },
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        },
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    },
    {
      code: toCode([
        '$$(".product").then(function (products) {',
        '    expect(products.length >= 1).toBeTruthy();',
        '});'
      ]),
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    },
    {
      code: toCode([
        '$$(".product").then(function (products) {',
        '    expect(1).toEqual(products.length);',
        '});'
      ]),
      errors: [
        {
          message: 'Array.length inside promise resolution function detected. Use count() instead.'
        }
      ]
    }
  ]
})
