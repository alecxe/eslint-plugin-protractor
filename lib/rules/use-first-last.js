'use strict'

/**
 * @fileoverview Recommend using `first()` instead of `get(0)` and `last()` instead of `get(-1)`
 * @author Alexander Afanasyev
 */

var valueFunction = {
  '0': 'first()',
  '-1': 'last()'
}

module.exports = {
  meta: {
    fixable: 'code',
    schema: []
  },

  create: function (context) {
    function getFirstArgumentValue (methodArguments) {
      var firstArgument = methodArguments[0]

      if (firstArgument) {
        if (firstArgument.hasOwnProperty('value') && firstArgument.value === 0) {
          return 0
        } else if (firstArgument.operator === '-' && firstArgument.argument && firstArgument.argument.hasOwnProperty('value')) {
          return -firstArgument.argument.value
        }
      }
    }

    function createFirstLastAutoFixFunction (property, argument, argumentValue) {
      var functionToUse = valueFunction[argumentValue]
      var rangeStart = property.range[0]
      var rangeEnd = argument.range[1] + 1  // 1 added for parenthesis

      return function (fixer) {
        // replace get(0) with first(), get(-1) with last()
        return fixer.replaceTextRange([rangeStart, rangeEnd], functionToUse)
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
              context.report({
                node: callee,
                message: 'Unexpected "get(' + argumentValue + ')" call, use "' + valueFunction[argumentValue] + '" instead',
                fix: createFirstLastAutoFixFunction(property, node.arguments[0], argumentValue)
              })
            }
          }
        }
      }
    }
  }
}
