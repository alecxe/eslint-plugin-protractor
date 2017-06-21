'use strict'

/**
 * @fileoverview Warn about using `getInnerHtml()` and `getOuterHtml()` methods
 * @author Alexander Afanasyev
 */

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        var object = node.callee.object
        var property = node.callee.property

        if (object && property) {
          var isInnerHtml = property.name === 'getInnerHtml'
          var isOuterHtml = property.name === 'getOuterHtml'
          if (isInnerHtml || isOuterHtml) {
            context.report({
              node: node,
              message: 'Unexpected "' + property.name + '()"'
            })
          }
        }
      }
    }
  }
}
