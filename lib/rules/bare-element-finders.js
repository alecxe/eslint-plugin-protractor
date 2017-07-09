'use strict'

/**
 * @fileoverview Warn if a bare ElementFinder or ElementArrayFinder is declared with no applied action
 * @author Alexander Afanasyev
 */

var isElementFinder = require('../is-element-finder')
var isElementArrayFinder = require('../is-element-array-finder')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    function isBareExpression (node) {
      return node.parent.type === 'ExpressionStatement'
    }

    return {
      CallExpression: function (node) {
        var isNodeElementFinder = isElementFinder(node)
        var isNodeElementArrayFinder = isElementArrayFinder(node)

        if (isNodeElementFinder || isNodeElementArrayFinder) {
          if (isBareExpression(node)) {
            var target = isNodeElementFinder ? 'ElementFinder' : 'ElementArrayFinder'

            context.report({
              node: node,
              message: 'Bare ' + target + ' with no applied action detected.'
            })
          }
        }
      }
    }
  }
}
