'use strict'

/**
 * @fileoverview Recommend using `first()` instead of `get(0)` and `last()` instead of `get(-1)`
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  var valueFunction = {
    '0': 'first()',
    '-1': 'last()'
  }

  return {
    CallExpression: function (node) {
      var property = node.callee.property

      if (property && property.name === 'get' && node.arguments) {
        var argument = node.arguments[0]
        var argumentValue

        if (argument) {
          if (argument.value === 0) {
            argumentValue = 0
          } else if (argument.operator === '-' && argument.argument && argument.argument.value === 1) {
            argumentValue = -1
          }

          if (argumentValue === 0 || argumentValue === -1) {
            var object = node.callee.object
            var callee = object.callee

            if (callee && ((callee.property && (callee.property.name === 'all' || callee.property.name === '$$')) ||
              (callee.name === '$$'))) {
              context.report(node, 'Unexpected "get(' + argumentValue + ')" call, use "' + valueFunction[argumentValue] + '" instead')
            }
          }
        }
      }
    }
  }
}
