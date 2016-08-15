'use strict'

/**
 * @fileoverview Utility function to extract attribute names from CSS selectors
 * @author Alexander Afanasyev
 */

var parser = require('./get-css-parser')

function extractAttributes (rule) {
  var attributes = []
  if (rule.attrs) {
    rule.attrs.forEach(function (attr) {
      attributes.push(attr.name)
    })
  }
  return attributes
}

module.exports = function (cssSelector) {
  try {
    var result = parser.parse(cssSelector)
  } catch (err) {
    // ignore parsing errors - we don't want it to fail miserably on a target machine during a ESLint run
    return []
  }

  // handling empty inputs
  if (!result) {
    return []
  }

  var attributes = []

  if (result.type === 'ruleSet') {
    var rule = result.rule
    while (rule) {
      attributes.push.apply(attributes, extractAttributes(rule))
      rule = rule.rule
    }
  } else if (result.type === 'selectors' && result.selectors) {
    result.selectors.forEach(function (selector) {
      var rule = selector.rule
      while (rule) {
        attributes.push.apply(attributes, extractAttributes(rule))
        rule = rule.rule
      }
    })
  }
  return attributes
}
