'use strict'

/**
 * @fileoverview Warn about using `getRawId()` method
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

        if (property && property.name === 'getRawId') {
          if (node.object && isElementFinder(node.object)) {
            context.report({
              node: property,
              message: 'Unexpected "' + property.name + '()". Use "getId()" instead'
            })
          }
        }
      }
    }
  }
}
