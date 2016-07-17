'use strict'

/**
 * @fileoverview Recommend against navigating to absolute URLs inside `browser.get()` or `browser.driver.get()`
 * @author Alexander Afanasyev
 */

var isBrowserGet = require('../is-browser-get')
var isAbsoluteURL = new RegExp('^(?:[a-z]+:)?//', 'i')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments[0]) {
          var result = isBrowserGet(node)

          if (result) {
            var url = node.arguments[0].value

            if (isAbsoluteURL.test(url)) {
              context.report({
                node: node,
                message: 'Unexpected absolute URL'
              })
            }
          }
        }
      }
    }
  }
}
