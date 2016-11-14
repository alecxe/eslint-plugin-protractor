'use strict'

/**
 * @fileoverview Ensure correct locator argument type for `element()`, `element.all()`, `$()` and `$$()`
 * @author Alexander Afanasyev
 */

var isElementFinder = require('../is-element-finder')
var isElementArrayFinder = require('../is-element-array-finder')

// The first four "is" functions below are simple helper functions that help to distinguish between `$` vs `element`, and `$$` vs `element.all`

/**
 * Checks if a given node is an ElementFinder represented by element() callee - both nested and not
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean}
 */
function isElement (node) {
  return node.callee.name === 'element' || (node.callee.property && node.callee.property.name === 'element')
}

/**
 * Checks if a given node is an ElementArrayFinder represented by all() callee - both nested and not
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean}
 */
function isElementAll (node) {
  return node.callee.property && node.callee.property.name === 'all'
}

/**
 * Checks if a given node is an ElementFinder represented by $() callee - both nested and not
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean}
 */
function is$ (node) {
  return node.callee.name === '$' || (node.callee.property && node.callee.property.name === '$')
}

/**
 * Checks if a given node is an ElementArrayFinder represented by $$() callee - both nested and not
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean}
 */
function is$$ (node) {
  return node.callee.name === '$$' || (node.callee.property && node.callee.property.name === '$$')
}

/**
 * Checks if a given CallExpression node has the first literal argument
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean}
 */
function isArgumentLiteral (node) {
  return node.arguments && node.arguments.length && node.arguments[0].type === 'Literal'
}

/**
 * Checks if a given CallExpression node has the argument the "by" expression
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean}
 */
function isArgumentByLocator (node) {
  if (node.arguments && node.arguments.length && node.arguments[0].type === 'CallExpression') {
    var argument = node.arguments[0]
    if (argument.callee && argument.callee.object && argument.callee.object.name === 'by') {
      return true
    }
  }
  return false
}

module.exports = {
  meta: {
    schema: []
  },

  // TODO: need to make isElementFinder and isElementArrayFinder universal - handling both Member and Call expressions
  create: function (context) {
    return {
      CallExpression: function (node) {
        // element finders
        if (isElementFinder(node)) {
          // handle element
          if (isElement(node) && isArgumentLiteral(node)) {
            context.report({
              node: node.arguments[0],
              message: 'Invalid locator type.'
            })
          }

          // handle $
          if (is$(node) && isArgumentByLocator(node)) {
            context.report({
              node: node.arguments[0],
              message: 'Invalid locator type.'
            })
          }
        }

        // element array finders
        if (isElementArrayFinder(node)) {
          // handle element.all
          if (isElementAll(node) && isArgumentLiteral(node)) {
            context.report({
              node: node.arguments[0],
              message: 'Invalid locator type.'
            })
          }

          // handle $$
          if (is$$(node) && isArgumentByLocator(node)) {
            context.report({
              node: node.arguments[0],
              message: 'Invalid locator type.'
            })
          }
        }
      }
    }
  }
}
