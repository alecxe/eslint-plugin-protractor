'use strict'

/**
 * @fileoverview Ensure tag name is valid when using `by.tagName()` locator.
 * @author Raul Gallegos
 */

var isTagName = /^[a-z](-?[a-z0-9]+)*$/i

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if ((node.callee.object || {}).name !== 'by' ||
          (node.callee.property || {}).name !== 'tagName') {
          return
        }

        var tagName = ((node.arguments || [])[0] || {}).value

        if (tagName && !isTagName.test(tagName)) {
          context.report({
            node: node.arguments[0],
            message: 'Invalid TagName value: "' + tagName + '"'
          })
        }
      }
    }
  }
}
