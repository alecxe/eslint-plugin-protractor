'use strict'

/**
 * @fileoverview Warn if `executeScript()` or `executeAsyncScript()` are called with no arguments
 * @author Alexander Afanasyev
 */

function isLiteral (node) {
  return node.type === 'Literal'
}

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        var object = node.callee.object
        var property = node.callee.property

        if (object && property && object.name === 'browser') {
          if (property.name === 'executeScript' || property.name === 'executeAsyncScript') {
            var argumentExists = node.arguments && node.arguments.length

            if (!argumentExists) {
              context.report({
                node: property,
                message: property.name + '() call without arguments'
              })

              return
            }

            var firstArgument = node.arguments[0]
            if (!isLiteral(firstArgument)) {
              return
            }

            var firstArgumentNonEmpty = firstArgument.value
            if (!firstArgumentNonEmpty) {
              context.report({
                node: property,
                message: property.name + '() called with an empty script'
              })
            }
          }
        }
      }
    }
  }
}
