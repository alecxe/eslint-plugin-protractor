'use strict'

var missingPerform = require('./lib/rules/missing-perform')
var noBrowserPause = require('./lib/rules/no-browser-pause')
var missingWaitMessage = require('./lib/rules/missing-wait-message')
var noBrowserSleep = require('./lib/rules/no-browser-sleep')
var noByXpath = require('./lib/rules/no-by-xpath')
var noDescribeSelectors = require('./lib/rules/no-describe-selectors')
var byCssShortcut = require('./lib/rules/by-css-shortcut')
var noAngularClasses = require('./lib/rules/no-angular-classes')
var noBootstrapClasses = require('./lib/rules/no-bootstrap-classes')
var useAngularLocators = require('./lib/rules/use-angular-locators')
var useSimpleRepeaters = require('./lib/rules/use-simple-repeaters')
var noShadowing = require('./lib/rules/no-shadowing')
var useFirstLast = require('./lib/rules/use-first-last')
var noGetInIt = require('./lib/rules/no-get-in-it')
var arrayCallbackReturn = require('./lib/rules/array-callback-return')
var noAbsoluteURL = require('./lib/rules/no-absolute-url')
var noExpectInPO = require('./lib/rules/no-expect-in-po')

module.exports = {
  rules: {
    'missing-perform': missingPerform,
    'no-browser-pause': noBrowserPause,
    'missing-wait-message': missingWaitMessage,
    'no-browser-sleep': noBrowserSleep,
    'no-by-xpath': noByXpath,
    'no-describe-selectors': noDescribeSelectors,
    'by-css-shortcut': byCssShortcut,
    'no-angular-classes': noAngularClasses,
    'no-bootstrap-classes': noBootstrapClasses,
    'use-angular-locators': useAngularLocators,
    'use-simple-repeaters': useSimpleRepeaters,
    'no-shadowing': noShadowing,
    'use-first-last': useFirstLast,
    'no-get-in-it': noGetInIt,
    'array-callback-return': arrayCallbackReturn,
    'no-absolute-url': noAbsoluteURL,
    'no-expect-in-po': noExpectInPO
  },
  configs: {
    recommended: {
      rules: {
        'protractor/missing-perform': 2,
        'protractor/no-browser-pause': 2,
        'protractor/missing-wait-message': 1,
        'protractor/no-browser-sleep': 1,
        'protractor/no-by-xpath': 1,
        'protractor/no-describe-selectors': 1,
        'protractor/no-angular-classes': 1,
        'protractor/no-bootstrap-classes': 1,
        'protractor/use-angular-locators': 1,
        'protractor/use-simple-repeaters': 1,
        'protractor/no-shadowing': 1,
        'protractor/use-first-last': 1,
        'protractor/no-get-in-it': 1,
        'protractor/array-callback-return': 1,
        'protractor/no-absolute-url': 1,
        'protractor/no-expect-in-po': 1,
        'protractor/by-css-shortcut': 0
      },
      globals: {
        'browser': false,
        'protractor': false,
        'by': false,
        'By': false,
        'element': false,
        '$': false,
        '$$': false,
        'ExpectedConditions': false
      }
    }
  }
}
