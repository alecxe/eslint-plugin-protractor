'use strict'

/**
 * Checks a given MemberExpression node is an ElementArrayFinder instance.
 *
 * @fileoverview Utility function to determine if a node is an ElementArrayFinder
 * @author Alexander Afanasyev
 */
module.exports = function (node) {
  // handling $$ shortcut
  var object = node.object
  if (object && object.callee && object.callee.name === '$$') {
    return true
  }

  if (object) {
    var callee = object.callee
    if (callee && callee.object && callee.property) {
      // handling chained $$
      if (callee.property.name === '$$') {
        return true
      }

      // handling element.all() and chained element() and all()
      if (callee.property.name === 'all' &&
        (callee.object.name === 'element' || (callee.object.callee && callee.object.callee.name === 'element'))) {
        return true
      }
    }
  }

  return false
}
