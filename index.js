'use strict'

module.exports = {
  rules: {
    'missing-perform': require('./lib/rules/missing-perform'),
    'no-browser-pause': require('./lib/rules/no-browser-pause'),
    'missing-wait-message': require('./lib/rules/missing-wait-message'),
    'no-browser-sleep': require('./lib/rules/no-browser-sleep'),
    'no-by-xpath': require('./lib/rules/no-by-xpath'),
    'no-describe-selectors': require('./lib/rules/no-describe-selectors')
  },
  configs: {
    recommended: {
      rules: {
        'protractor/missing-perform': 2,
        'protractor/no-browser-pause': 2,
        'protractor/missing-wait-message': 1,
        'protractor/no-browser-sleep': 1,
        'protractor/no-by-xpath': 1,
        'protractor/no-describe-selectors': 1
      }
    }
  }
}
