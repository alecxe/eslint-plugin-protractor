'use strict'

/**
 * @fileoverview Warn about using `getInnerHtml()` and `getOuterHtml()` methods
 * @author Alexander Afanasyev
 */

var isElementFinder = require('../is-element-finder')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      MemberExpression: function (node) {
        var property = node.property

        if (property && (property.name === 'getInnerHtml' || property.name === 'getOuterHtml')) {
          if (node.object && isElementFinder(node.object)) {
            context.report({
              node: property,
              message: 'Unexpected "' + property.name + '()"'
            })
          }
        }
      }
    }
  }
}
