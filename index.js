'use strict'

module.exports = {
  rules: {
    'missing-perform': require('./lib/rules/missing-perform'),
    'no-browser-pause': require('./lib/rules/no-browser-pause'),
    'missing-wait-message': require('./lib/rules/missing-wait-message'),
    'no-browser-sleep': require('./lib/rules/no-browser-sleep'),
    'no-by-xpath': require('./lib/rules/no-by-xpath'),
    'no-describe-selectors': require('./lib/rules/no-describe-selectors'),
    'by-css-shortcut': require('./lib/rules/by-css-shortcut'),
    'no-angular-classes': require('./lib/rules/no-angular-classes'),
    'use-angular-locators': require('./lib/rules/use-angular-locators')
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
        'protractor/use-angular-locators': 1,
        'protractor/by-css-shortcut': 0
      }
    }
  }
}
