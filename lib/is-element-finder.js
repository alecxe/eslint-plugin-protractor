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
var elementFinderConstructors = [
  '$',
  'element'
]

module.exports = function (node) {
  var callee = node.callee
  if (!callee) {
    return false
  }

  // handling raw $ and element
  if (elementFinderConstructors.indexOf(callee.name) > -1) {
    return true
  }

  // handling $ and element chaining
  if (callee.type === 'MemberExpression' && callee.property) {
    if (elementFinderConstructors.indexOf(callee.property.name) > -1) {
      return true
    }

    // got element finder from element array finder
    var isElementArrayFinderMethod = elementArrayFinderGetMethods.indexOf(callee.property.name) > -1
    if (isElementArrayFinderMethod && callee.object && isElementArrayFinder(callee.object)) {
      return true
    }
  }

  return false
}
