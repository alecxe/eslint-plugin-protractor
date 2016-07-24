'use strict'

/**
 * @fileoverview Warn if promise is checked for truthiness inside an `if` condition
 * @author Alexander Afanasyev
 */

var methodNames = [
  'isDisplayed',
  'isPresent',
  'isElementPresent',
  'isSelected',
  'isEnabled'
]

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    // --------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------

    /**
     * Checks if a node has a promise method called.
     * @param {ASTNode} node The AST node to check, expecting CallExpression.
     * @returns {Bool} method name, false if no promise truthiness check found.
     * @private
     */
    function hasPromiseMethod (node) {
      if (node.type === 'CallExpression' && node.callee) {
        var property = node.callee.property
        if (property && methodNames.indexOf(property.name) >= 0) {
          return property.name
        }
      }
      return false
    }
    /**
     * Checks if a node has a promise checked for truthiness.
     * @param {ASTNode} node The AST node to check.
     * @param {boolean} inBooleanPosition `false` if checking branch of a condition.
     *  `true` in all other cases
     * @returns {Bool} method name, false if no promise truthiness check found.
     * @private
     */
    function hasPromise (node, inBooleanPosition) {
      switch (node.type) {
        case 'CallExpression':
          return hasPromiseMethod(node)

        case 'UnaryExpression':
          return hasPromise(node.argument, true)

        case 'BinaryExpression':
          return hasPromise(node.left, false) || hasPromise(node.right, false)

        case 'LogicalExpression':
          var leftHasPromise = hasPromise(node.left, inBooleanPosition)
          var rightHasPromise = hasPromise(node.right, inBooleanPosition)

          return leftHasPromise || rightHasPromise

        case 'AssignmentExpression':
          return (node.operator === '=') && hasPromise(node.right, inBooleanPosition)

        case 'SequenceExpression':
          return hasPromise(node.expressions[node.expressions.length - 1], inBooleanPosition)
      }
      return false
    }

    return {
      IfStatement: function (node) {
        if (node.test) {
          var result = hasPromise(node.test, true)
          if (result) {
            context.report({
              node: node,
              message: 'Unexpected "' + result + '()" inside if condition'
            })
          }
        }
      }
    }
  }
}
