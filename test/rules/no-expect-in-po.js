'use strict'

var rule = require('../../lib/rules/no-expect-in-po')
var RuleTester = require('eslint').RuleTester
var eslintTester = new RuleTester()

eslintTester.run('no-expect-in-po', rule, {
  valid: [
    {
      code: 'var test = "bar"'
    },

    {
      code: 'expect(1).toEqual(1);'
    },

    {
      code: 'expect(2).toEqual(2);',
      'eslint-plugin-protractor': {
        settings: {
          paths: {
            po: ['*.po.js']
          }
        }
      },
      filename: 'test.spec.js'
    },

    {
      code: 'expect(3).toEqual(3);',
      'eslint-plugin-protractor': {
        settings: {
          paths: {
            po: ['*.somethingelse.js']
          }
        }
      },
      filename: 'test.po.js'
    },

    {
      code: 'expect(4).toEqual(4);',
      'eslint-plugin-protractor': {
        settings: {
          paths: {
            po: []
          }
        }
      },
      filename: 'test.po.js'
    },

    {
      code: 'expect(5).toEqual(5);',
      'eslint-plugin-protractor': {
        settings: {
          paths: {
            po: ['*.somethingelse1.js', '*.somethingelse2.js']
          }
        }
      },
      filename: 'test.po.js'
    }
  ],

  invalid: [
    {
      code: 'expect(-1).toEqual(-1);',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: ['**/po/*.po.js']
          }
        }
      },
      filename: '/var/app/test/e2e/po/test.po.js',
      errors: [{
        message: 'Unexpected "expect()" inside a Page Object'
      }]
    },

    {
      code: 'expect(-2).toEqual(-2);',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: ['**/*.js']
          }
        }
      },
      filename: '/var/app/test/e2e/po/test.po.js',
      errors: [{
        message: 'Unexpected "expect()" inside a Page Object'
      }]
    },

    {
      code: 'expect(-3).toEqual(-3);',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: ['**/*.somethingelse1.js', '**/*.po.js', '**/*.somethingelse2.js']
          }
        }
      },
      filename: '/var/app/test/e2e/po/test.po.js',
      errors: [{
        message: 'Unexpected "expect()" inside a Page Object'
      }]
    }
  ]
})
