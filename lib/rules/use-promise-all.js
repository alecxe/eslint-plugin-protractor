'use strict'

/**
 * @fileoverview Recommend using `protractor.promise.all()` to resolve multiple promises
 * @author Alexander Afanasyev
 */

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    function isThenCallBack (node) {
      var property = node.callee.property
      var isThen = property && property.name === 'then' && node.arguments
      if (isThen) {
        var argument = node.arguments[0]
        // only function type allowed
        var isFunction = argument && (argument.type === 'FunctionExpression' || argument.type === 'ArrowFunctionExpression')
        if (isFunction) {
          // it has to have at least one argument
          var hasArguments = argument.params && argument.params.length > 0
          return hasArguments
        }
      }
      return false
    }

    return {
      CallExpression: function (node) {
        if (isThenCallBack(node)) {
          // find a "then()" callback among the node's ancestors
          var ancestor
          var ancestors = context.getAncestors(node)

          for (var i = 0; i < ancestors.length; i++) {
            ancestor = ancestors[i]
            if (ancestor && ancestor.type === 'CallExpression' && isThenCallBack(ancestor)) {
              context.report({
                node: node,
                message: 'Nested promise resolutions detected. Use "protractor.promise.all()" instead'
              })
              break
            }
          }
        }
      }
    }
  }
}
