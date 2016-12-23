'use strict'

/**
 * @fileoverview Check if we are using browser.driver instead of browser directly
 * @author Raul Gallegos
 */

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'MemberExpression': function (node) {
        var object = node.object
        var property = node.property

        if (object && object.name === 'browser' && property && property.name === 'driver') {
          context.report({
            node: node,
            message: 'Unexpected use of browser.driver instead of browser'
          })
        }
      }
    }
  }
}
