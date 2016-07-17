'use strict'

/**
 * @fileoverview Recommend against having `browser.get()` or `browser.driver.get()` inside `it()`
 * @author Alexander Afanasyev
 */

var isBrowserGet = require('../is-browser-get')

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
        var result = isBrowserGet(node)

        if (result) {
          // Use ancestors to determine if we are inside the it() block currently
          for (var i = 0; i < context.getAncestors().length; i++) {
            var parent = context.getAncestors()[i]
            if (parent.type === 'CallExpression' && testFunctionNames.indexOf(parent.callee.name) >= 0) {
              var methodName = result.browserGet ? 'browser.get()' : 'browser.driver.get()'
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
