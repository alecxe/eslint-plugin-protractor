'use strict'

/**
 * @fileoverview Utility function to extract the "by" locator values. Also handles the "$" and "$$" shortcuts.
 * @author Alexander Afanasyev
 */
module.exports = function (node) {
  var object = node.callee.object
  var property = node.callee.property

  var insideBy = object && property && object.name === 'by'
  var dollarShortcuts = node.callee.name === '$' || node.callee.name === '$$'
  var chainedDollarShortcuts = property && (property.name === '$' || property.name === '$$')

  // handling by.smth calls
  if (insideBy) {
    var hasArgument = node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')
    if (hasArgument) {
      return {
        by: property.name,
        value: node.arguments[0].value
      }
    }
  }

  // handling $ and $$ calls
  if (dollarShortcuts || chainedDollarShortcuts) {
    return {
      by: 'css',
      value: node.arguments[0].value
    }
  }
}
