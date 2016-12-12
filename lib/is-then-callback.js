'use strict'

/**
 * Checks if a given node is a "then" callback function
 *
 * @param {ASTNode} node - A node to check.
 * @returns {ASTNode} node - The first function argument node.
 */
module.exports = function (node) {
  var property = node.callee.property
  var isThen = property && property.name === 'then' && node.arguments
  if (isThen) {
    var argument = node.arguments[0]
    // only function type allowed
    var isFunction = argument && (argument.type === 'FunctionExpression' || argument.type === 'ArrowFunctionExpression')
    if (isFunction) {
      // it has to have at least one argument
      if (argument.params && argument.params.length > 0) {
        return argument.params[0]
      }
    }
  }
  return false
}
