'use strict'

var rule = require('../../lib/rules/use-promise-all')
var RuleTester = require('eslint').RuleTester
var toCode = require('../lib/join-multiline-code')

var eslintTester = new RuleTester()

eslintTester.run('use-promise-all', rule, {
  valid: [
    toCode([
      'elm1.getText().then(function (text1) {',
      '  console.log(text1);',
      '});'
    ]),
    toCode([
      'elm1.getText().then(function (text1) {',
      '  console.log(text1);',
      '});',
      'elm2.getText().then(function (text2) {',
      '  console.log(text2);',
      '});'
    ]),
    {
      code: toCode([
        'elm1.getText().then((text1) => {',
        '  console.log(text1);',
        '})'
      ]),
      parserOptions: {
        ecmaVersion: 6
      }
    },
    {
      code: toCode([
        'elm1.getText().then((text1) => {',
        '  console.log(text1);',
        '})',
        'elm2.getText().then((text2) => {',
        '  console.log(text2);',
        '})'
      ]),
      parserOptions: {
        ecmaVersion: 6
      }
    },
    toCode([
      'protractor.promise.all([elm1.getText(), elm2.getText()]).then(function (texts) {',
      '  console.log(texts);',
      '});'
    ])
  ],

  invalid: [
    {
      code: toCode([
        'elm1.getText().then(function (text1) {',
        '  elm2.getText().then(function (text2) {',
        '    console.log(text1 + text2);',
        '  });',
        '});'
      ]),
      errors: [
        {
          message: 'Nested promise resolutions detected. Use "protractor.promise.all()" instead'
        }
      ]
    },
    {
      code: toCode([
        'elm1.getAttribute("value").then(function (value1) {',
        '  elm2.getText().then(function (text2) {',
        '    elm3.getAttribute("value").then(function (value3) {',
        '        console.log(value1 + text2 + value3);',
        '    });',
        '  });',
        '});'
      ]),
      errors: [
        {
          message: 'Nested promise resolutions detected. Use "protractor.promise.all()" instead'
        },
        {
          message: 'Nested promise resolutions detected. Use "protractor.promise.all()" instead'
        }
      ]
    },
    {
      code: toCode([
        'elm1.getText().then((text1) => {',
        '  elm2.getText().then((text2) => {',
        '    console.log(text1 + text2);',
        '  })',
        '})'
      ]),
      parserOptions: {
        ecmaVersion: 6
      },
      errors: [
        {
          message: 'Nested promise resolutions detected. Use "protractor.promise.all()" instead'
        }
      ]
    }
  ]
})
