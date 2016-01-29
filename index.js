'use strict'

module.exports = {
  rules: {
    'missing-perform': require('./lib/rules/missing-perform')
  },
  rulesConfig: {
    'missing-perform': 2
  }
}
