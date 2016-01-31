'use strict'

module.exports = {
  rules: {
    'missing-perform': require('./lib/rules/missing-perform'),
    'missing-wait-message': require('./lib/rules/missing-wait-message')
  },
  rulesConfig: {
    'missing-perform': 2,
    'missing-wait-message': 1
  }
}
