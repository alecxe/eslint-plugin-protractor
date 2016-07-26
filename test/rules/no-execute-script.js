'use strict'

var rule = require('../../lib/rules/no-execute-script')
var RuleTester = require('eslint').RuleTester
var eslintTester = new RuleTester()

eslintTester.run('no-execute-script', rule, {
  valid: [
    {
      code: 'var test = "bar"'
    },

    {
      code: 'browser.executeScript("return 1;");'
    },

    {
      code: 'browser.executeScript("return 2;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: ['*.txt']
          }
        }
      },
      filename: '/usr/app/test/e2e/specs/test.spec.js'
    },

    {
      code: 'browser.executeScript("return 3;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            specs: ['*.somethingelse.js']
          }
        }
      },
      filename: 'test.spec.js'
    },

    {
      code: 'browser.executeScript("return 4;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: [],
            specs: []
          }
        }
      },
      filename: 'test.po.js'
    },

    {
      code: 'browser.executeScript("return 5;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            specs: ['*.somethingelse1.js', '*.somethingelse2.js']
          }
        }
      },
      filename: 'test.spec.js'
    },

    {
      code: 'browser.get("url");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            specs: ['**/*.spec.js', '*.spec.js']
          }
        }
      },
      filename: 'test.spec.js'
    }
  ],

  invalid: [
    {
      code: 'browser.executeScript("return -1;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: ['**/po/*.po.js']
          }
        }
      },
      filename: '/var/app/test/e2e/po/test.po.js',
      errors: [{
        message: 'Unexpected "browser.executeScript()"'
      }]
    },

    {
      code: 'browser.executeAsyncScript("return -2;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            specs: ['**/*.spec.js']
          }
        }
      },
      filename: '/var/app/test/e2e/specs/test.spec.js',
      errors: [{
        message: 'Unexpected "browser.executeAsyncScript()"'
      }]
    },

    {
      code: 'browser.driver.executeScript("return -3;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: ['**/*.somethingelse1.js', '**/*.po.js', '**/*.somethingelse2.js']
          }
        }
      },
      filename: '/var/app/test/e2e/po/test.po.js',
      errors: [{
        message: 'Unexpected "browser.driver.executeScript()"'
      }]
    },

    {
      code: 'browser.driver.executeAsyncScript("return -4;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: [],
            specs: ['**/*.somethingelse1.js', '**/*.spec.js', '**/*.somethingelse2.js']
          }
        }
      },
      filename: '/var/app/test/e2e/specs/test.spec.js',
      errors: [{
        message: 'Unexpected "browser.driver.executeAsyncScript()"'
      }]
    },

    {
      code: 'browser.executeAsyncScript("return -5;");',
      settings: {
        'eslint-plugin-protractor': {
          paths: {
            po: ['**/*.po.js'],
            specs: ['**/*.somethingelse1.js', '**/*.somethingelse2.js']
          }
        }
      },
      filename: '/var/app/test/e2e/po/test.po.js',
      errors: [{
        message: 'Unexpected "browser.executeAsyncScript()"'
      }]
    }
  ]
})
