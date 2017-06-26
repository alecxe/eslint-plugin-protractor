'use strict'

/**
 * @fileoverview Warn about potentially "deep" CSS selectors with too many nodes in the path
 * @author Alexander Afanasyev
 */
var isCSSLocator = require('../find-css-locator')
var getSelectorDepth = require('../get-selector-depth')

module.exports = {
  meta: {
    schema: [
      {
        type: 'integer',
        additionalProperties: false
      }
    ]
  },

  create: function (context) {
    var maxDepth = context.options.length ? context.options[0] : 5

    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isCSSLocator(node)) {
            var cssSelector = node.arguments[0].value
            var depth = getSelectorDepth(cssSelector)

            if (depth > maxDepth) {
              context.report({
                node: node.arguments[0],
                message: 'CSS selector has too many nodes.'
              })
            }
          }
        }
      }
    }
  }
}
