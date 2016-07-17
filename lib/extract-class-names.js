'use strict'

/**
 * @fileoverview Utility function to extract class names from a CSS selector
 * @author Alexander Afanasyev
 */

// setup up CSS selector parser
var CssSelectorParser = require('css-selector-parser').CssSelectorParser
var parser = new CssSelectorParser()

parser.registerSelectorPseudos('has', 'contains')
parser.registerNestingOperators('>', '+', '~')
parser.registerAttrEqualityMods('^', '$', '*', '~', '|')
parser.enableSubstitutes()

function extractClassNames (rule) {
  var classNames = []
  // extract class names defined with ".", e.g. .myclass
  if (rule.classNames) {
    classNames.push.apply(classNames, rule.classNames)
  }

  // extract class names defined in attributes, e.g. [class*=myclass]
  if (rule.attrs) {
    rule.attrs.forEach(function (attr) {
      if (attr.name === 'class') {
        classNames.push(attr.value)
      }
    })
  }

  return classNames
}

module.exports = function (cssSelector) {
  try {
    var result = parser.parse(cssSelector)
  } catch (err) {
    // ignore parsing errors - we don't want it to fail miserably on a target machine during a ESLint run
    console.log('Parsing CSS selector: "' + cssSelector + '". ' + err)
    return []
  }

  // handling empty inputs
  if (!result) {
    return []
  }

  var classNames = []

  if (result.type === 'ruleSet') {
    var rule = result.rule
    while (rule) {
      classNames.push.apply(classNames, extractClassNames(rule))
      rule = rule.rule
    }
  } else if (result.type === 'selectors' && result.selectors) {
    result.selectors.forEach(function (selector) {
      classNames.push.apply(classNames, extractClassNames(selector.rule))
    })
  }
  return classNames
}
