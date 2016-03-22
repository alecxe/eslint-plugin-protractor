'use strict'

module.exports = {
  rules: {
    'missing-perform': require('./lib/rules/missing-perform'),
    'no-browser-pause': require('./lib/rules/no-browser-pause'),
    'missing-wait-message': require('./lib/rules/missing-wait-message'),
    'no-browser-sleep': require('./lib/rules/no-browser-sleep'),
    'no-by-xpath': require('./lib/rules/no-by-xpath')
  },
  rulesConfig: {
    'missing-perform': 2,
    'no-browser-pause': 2,
    'missing-wait-message': 1,
    'no-browser-sleep': 1,
    'no-by-xpath': 1
  }
}
