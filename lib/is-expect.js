'use strict'

/**
 * Checks if a given node is an "expect" statement - works for both left and right parts
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean}
 */
module.exports = function (node) {
  var callee = node.callee

  // left part of "expect()"
  if (callee && callee.name === 'expect') {
    return true
  }

  // right part of "expect()"
  if (callee.object && callee.object.type === 'CallExpression' && callee.object.callee) {
    callee = callee.object.callee
    if (callee.name && callee.name === 'expect') {
      return true
    }
  }
}
