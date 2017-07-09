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
var noPromiseInIf = require('./lib/rules/no-promise-in-if')
var noExecuteScript = require('./lib/rules/no-execute-script')
var correctChaining = require('./lib/rules/correct-chaining')
var noRepetitiveLocators = require('./lib/rules/no-repetitive-locators')
var noRepetitiveSelectors = require('./lib/rules/no-repetitive-selectors')
var noGetInnerOuterHtml = require('./lib/rules/no-get-inner-outer-html')
var noAngularAttributes = require('./lib/rules/no-angular-attributes')
var noInvalidSelectors = require('./lib/rules/no-invalid-selectors')
var usePromiseAll = require('./lib/rules/use-promise-all')
var noArrayFinderMethods = require('./lib/rules/no-array-finder-methods')
var validLocatorType = require('./lib/rules/valid-locator-type')
var noCompoundClasses = require('./lib/rules/no-compound-classes')
var useCountMethod = require('./lib/rules/use-count-method')
var noBrowserDriver = require('./lib/rules/no-browser-driver')
var validById = require('./lib/rules/valid-by-id')
var validByTagName = require('./lib/rules/valid-by-tagname')
var noGetRawId = require('./lib/rules/no-get-raw-id')
var noGetLocationAbsUrl = require('./lib/rules/no-get-location-abs-url')
var limitSelectorDepth = require('./lib/rules/limit-selector-depth')
var bareElementFinders = require('./lib/rules/bare-element-finders')

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
    'no-expect-in-po': noExpectInPO,
    'no-promise-in-if': noPromiseInIf,
    'no-execute-script': noExecuteScript,
    'no-repetitive-locators': noRepetitiveLocators,
    'no-repetitive-selectors': noRepetitiveSelectors,
    'correct-chaining': correctChaining,
    'no-get-inner-outer-html': noGetInnerOuterHtml,
    'no-angular-attributes': noAngularAttributes,
    'no-invalid-selectors': noInvalidSelectors,
    'use-promise-all': usePromiseAll,
    'no-array-finder-methods': noArrayFinderMethods,
    'valid-locator-type': validLocatorType,
    'no-compound-classes': noCompoundClasses,
    'use-count-method': useCountMethod,
    'no-browser-driver': noBrowserDriver,
    'valid-by-id': validById,
    'valid-by-tagname': validByTagName,
    'no-get-raw-id': noGetRawId,
    'no-get-location-abs-url': noGetLocationAbsUrl,
    'limit-selector-depth': limitSelectorDepth,
    'bare-element-finders': bareElementFinders
  },
  configs: {
    recommended: {
      rules: {
        'protractor/missing-perform': 2,
        'protractor/no-browser-pause': 2,
        'protractor/correct-chaining': 2,
        'protractor/no-invalid-selectors': 2,
        'protractor/no-array-finder-methods': 2,
        'protractor/no-get-raw-id': 2,
        'protractor/valid-locator-type': 2,
        'protractor/no-compound-classes': 2,
        'protractor/no-get-inner-outer-html': 2,
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
        'protractor/no-promise-in-if': 1,
        'protractor/no-execute-script': 1,
        'protractor/no-repetitive-locators': 1,
        'protractor/no-repetitive-selectors': 1,
        'protractor/no-angular-attributes': 1,
        'protractor/use-count-method': 1,
        'protractor/valid-by-id': 1,
        'protractor/valid-by-tagname': 1,
        'protractor/limit-selector-depth': 1,
        'protractor/no-get-location-abs-url': 1,
        'protractor/bare-element-finders': 1,
        'protractor/use-promise-all': 0,
        'protractor/by-css-shortcut': 0,
        'protractor/no-browser-driver': 0
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
