'use strict'

/**
 * Checks if a given node is a "then" callback function
 *
 * @param {ASTNode} node - A node to check.
 * @returns {ASTNode} node - The then callback function node or false if a given node is not a "then" callback function.
 */
module.exports = function (node) {
  var property = node.callee.property
  var isThen = property && property.name === 'then' && node.arguments
  if (isThen) {
    var argument = node.arguments[0]
    // only function type allowed
    var isFunction = argument && (argument.type === 'FunctionExpression' || argument.type === 'ArrowFunctionExpression')
    if (isFunction) {
      return argument
    }
  }
  return false
}
