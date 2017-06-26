'use strict'

/**
 * @fileoverview Utility function to calculate the number of nodes in a given CSS selector
 * @author Alexander Afanasyev
 */

var parser = require('./get-css-parser')

module.exports = function (cssSelector) {
  var parsedSelector = parser.parse(cssSelector)

  if (!parsedSelector) {
    return 0
  }

  var rule = parsedSelector.rule
  var depth = 0
  while (rule) {
    rule = rule.rule
    depth += 1
  }
  return depth
}
