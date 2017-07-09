'use strict'

/**
 * Checks a given CallExpression node is an ElementArrayFinder instance.
 *
 * @fileoverview Utility function to determine if a node is an ElementArrayFinder
 * @author Alexander Afanasyev
 */

module.exports = function isElementArrayFinder (node) {
  var callee = node.callee

  if (callee) {
    // handling $$ shortcut
    if (callee.name === '$$') {
      return true
    }

    // handling element.all() and nested .all()
    if (callee.property && (callee.property.name === 'all' || callee.property.name === '$$')) {
      if (callee.object) {
        if (callee.object.type === 'Identifier') {
          return callee.object.name === 'element'
        }

        if (callee.object.type === 'CallExpression') {
          return isElementFinder(callee.object) || isElementArrayFinder(callee.object)
        }
      }
    }
  }

  return false
}
var isElementFinder = require('./is-element-finder')
