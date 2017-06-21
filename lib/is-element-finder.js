'use strict'

/**
 * Checks if a given node is an ElementFinder instance.
 *
 * @fileoverview Utility function to determine if a node is an ElementFinder
 * @author Alexander Afanasyev
 */

var isElementArrayFinder = require('./is-element-array-finder')
var elementArrayFinderGetMethods = [
  'get',
  'last',
  'first'
]

module.exports = function (node) {
  var callee = node.callee
  if (callee) {
    // handling raw $ and element
    if (callee.name === '$' || callee.name === 'element') {
      return true
    }

    // handling $ and element chaining
    if (callee.type === 'MemberExpression' && callee.property) {
      if (callee.property.name === '$' || callee.property.name === 'element') {
        return true
      }

      // got element finder from element array finder
      if (elementArrayFinderGetMethods.indexOf(callee.property.name) > -1 && callee.object && isElementArrayFinder(callee.object)) {
        return true
      }
    }
  }

  return false
}
