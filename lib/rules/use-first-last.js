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

  function getFirstArgumentValue (methodArguments) {
    var firstArgument = methodArguments[0]

    if (firstArgument) {
      if (firstArgument.value === 0) {
        return 0
      } else if (firstArgument.operator === '-') {
        return -firstArgument.argument.value
      }
    }
  }

  return {
    CallExpression: function (node) {
      var property = node.callee.property

      if (property && property.name === 'get' && node.arguments) {
        var argumentValue = getFirstArgumentValue(node.arguments)

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
