'use strict'

/**
 * @fileoverview Recommend against having `browser.get()` or `browser.driver.get()` inside `it()`
 * @author Alexander Afanasyev
 */

var testFunctionNames = [
  'it'
]

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        var object = node.callee.object
        var property = node.callee.property

        if (object && property && property.name === 'get') {
          var isBrowserGet = object.name === 'browser'
          var isBrowserDriverGet = object.object && object.object.name === 'browser' &&
                                   object.property && object.property.name === 'driver'

          if (isBrowserGet || isBrowserDriverGet) {
            // Use ancestors to determine if we are inside the it() block currently
            for (var i = 0; i < context.getAncestors().length; i++) {
              var parent = context.getAncestors()[i]
              if (parent.type === 'CallExpression' && testFunctionNames.indexOf(parent.callee.name) >= 0) {
                var methodName = isBrowserGet ? 'browser.get()' : 'browser.driver.get()'
                context.report({
                  node: node,
                  message: 'Unexpected "' + methodName + '" inside it'
                })
                break
              }
            }
          }
        }
      }
    }
  }
}
