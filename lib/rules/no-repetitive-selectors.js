'use strict'

/**
 * @fileoverview Discourage repeating parts of CSS selectors
 * @author Alexander Afanasyev
 */

var isCSSLocator = require('../find-css-locator')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    // keeping the processed CSS selectors to check the next one against
    var selectors = []

    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isCSSLocator(node)) {
            // we don't want to report the same repeated part multiple times
            var alreadyReported = []

            var currentSelector = node.arguments[0].value
            var currentSelectorParts = currentSelector.split(' ')

            selectors.forEach(function (selectorParts) {
              // match the parts until a different part is found
              var sameParts = []
              for (var i = 0; i < selectorParts.length; i++) {
                if (selectorParts[i] === currentSelectorParts[i]) {
                  sameParts.push(selectorParts[i])
                } else {
                  break
                }
              }

              var samePart = sameParts.join(' ').trim()
              if (samePart && alreadyReported.indexOf(samePart) < 0) {
                context.report({
                  node: node,
                  message: 'Repetitive part of a selector detected: "' + samePart + '"'
                })
                alreadyReported.push(samePart)
              }
            })

            selectors.push(currentSelectorParts)
          }
        }
      }
    }
  }
}
