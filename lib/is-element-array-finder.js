'use strict'

/**
 * Checks a given CallExpression node is an ElementArrayFinder instance.
 *
 * @fileoverview Utility function to determine if a node is an ElementArrayFinder
 * @author Alexander Afanasyev
 */
module.exports = function (node) {
  var callee = node.callee

  if (callee) {
    // handling $$ shortcut
    if (callee.name === '$$') {
      return true
    }

    // handling element.all()
    if (callee.object && callee.object.name === 'element' && callee.property && callee.property.name === 'all') {
      return true
    }

    // handling nested expressions
    if (callee.object && callee.property) {
      // handling chained $$
      if (callee.property.name === '$$') {
        return true
      }

      // handling element.all() and chained element() and all()
      if (callee.property.name === 'all') {
        // TODO: inspect all the callees and search for element or $?
        return true
      }
    }
  }

  return false
}
