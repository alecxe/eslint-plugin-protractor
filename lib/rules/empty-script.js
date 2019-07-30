'use strict'

/**
 * @fileoverview Warn if `executeScript()` or `executeAsyncScript()` are called with no arguments
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

            var firstArgumentNonEmpty = argumentExists && node.arguments[0].value
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
