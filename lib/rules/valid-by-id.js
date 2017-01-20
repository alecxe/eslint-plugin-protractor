'use strict'

/**
 * @fileoverview Ensure ID is valid when using `by.id()` locator.
 * @author Raul Gallegos
 */

var isHtmlID = /^[A-Za-z]+[\w\-:.]*$/

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        var object = node.callee.object
        var property = node.callee.property

        var insideById = object && property && object.name === 'by' && property.name === 'id'
        var argumentExists = node.arguments && node.arguments.length && node.arguments[0].value

        if (insideById && argumentExists) {
          var idValue = node.arguments[0].value
          if (!idValue.match(isHtmlID)) {
            context.report({
              node: node,
              message: 'Invalid ID value: "' + idValue + '"'
            })
          }
        }
      }
    }
  }
}
