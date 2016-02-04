'use strict'

module.exports = {
  rules: {
    'missing-perform': require('./lib/rules/missing-perform'),
    'missing-wait-message': require('./lib/rules/missing-wait-message'),
    'no-browser-sleep': require('./lib/rules/no-browser-sleep')
  },
  rulesConfig: {
    'missing-perform': 2,
    'missing-wait-message': 1,
    'no-browser-sleep': 1
  }
}
