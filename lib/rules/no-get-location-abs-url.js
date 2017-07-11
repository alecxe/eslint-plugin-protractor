'use strict'

/**
 * @fileoverview Warn about deprecated browser.getLocationAbsUrl() method
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

        if (object && property && object.name === 'browser' && property.name === 'getLocationAbsUrl') {
          context.report({
            node: property,
            message: 'Unexpected browser.getLocationAbsUrl()'
          })
        }
      }
    }
  }
}
