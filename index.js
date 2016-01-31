'use strict'

module.exports = {
  rules: {
    'missing-perform': require('./lib/rules/missing-perform')
  },
  rulesConfig: {
    'missing-perform': 2,
    'missing-wait-message': 1
  }
}
