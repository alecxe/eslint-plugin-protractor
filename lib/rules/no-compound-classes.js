'use strict'

/**
 * @fileoverview Do not allow compound class names in the by.className locator
 * @author Alexander Afanasyev
 */
var isLocator = require('../find-locator')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isLocator(node, 'className')) {
            var locatorValue = node.arguments[0].value.trim()

            if (locatorValue.indexOf(' ') >= 0) {
              context.report({
                node: node.arguments[0],
                message: 'No compound class names allowed.'
              })
            }
          }
        }
      }
    }
  }
}
