'use strict'

/**
 * @fileoverview Utility function to extract the "by" locator values. Also handles the "$" and "$$" shortcuts.
 * @author Alexander Afanasyev
 */

function onlyLiteralArguments (node) {
  return node.arguments.every(function (arg) {
    return arg.type === 'Literal'
  })
}

module.exports = function (node) {
  var object = node.callee.object
  var property = node.callee.property

  var insideBy = object && property && object.name === 'by'
  var dollarShortcuts = node.callee.name === '$' || node.callee.name === '$$'
  var chainedDollarShortcuts = property && (property.name === '$' || property.name === '$$')

  // handling by.smth calls
  if (insideBy) {
    var hasArgument = node.arguments && node.arguments.length
    if (hasArgument && onlyLiteralArguments(node)) {
      return {
        by: property.name,
        value: node.arguments.map(function (arg) {
          return arg.value
        })
      }
    }
  }

  // handling $ and $$ calls
  if (dollarShortcuts || chainedDollarShortcuts) {
    var value = node.arguments[0].value
    return {
      by: 'css',
      value: value ? [value] : undefined
    }
  }
}
