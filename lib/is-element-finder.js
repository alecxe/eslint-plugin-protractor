'use strict'

/**
 * Checks if a given node is an ElementFinder instance.
 *
 * @fileoverview Utility function to determine if a node is an ElementFinder
 * @author Alexander Afanasyev
 */
module.exports = function (node) {
  // handling $ shortcut
  var callee = node.callee
  if (callee) {
    if (callee.name === '$' || callee.name === 'element') {
      return true
    }

    // handling $ and element chaining
    if (callee.type === 'MemberExpression' && callee.property) {
      if (callee.property.name === '$' || callee.property.name === 'element') {
        return true
      }
    }
  }

  return false
}
