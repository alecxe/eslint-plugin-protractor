'use strict'

/**
 * @fileoverview Discourage the use of by.xpath() (no-by-xpath)
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

        if (object && property && object.name === 'by' && property.name === 'xpath') {
          context.report({
            node: property,
            message: 'Unexpected by.xpath()'
          })
        }
      }
    }
  }
}
