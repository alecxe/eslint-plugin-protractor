'use strict'

/**
 * @fileoverview Ensure tag name is valid when using `by.tagName()` locator.
 * @author Raul Gallegos
 */

var isTagName = /^[A-Za-z][A-Za-z0-9]*$/

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        var object = node.callee.object
        var property = node.callee.property

        var insideByTagName = object && property && object.name === 'by' && property.name === 'tagName'
        var argumentExists = node.arguments && node.arguments.length && node.arguments[0].value

        if (insideByTagName && argumentExists) {
          var tagName = node.arguments[0].value
          if (!tagName.match(isTagName)) {
            context.report({
              node: node,
              message: 'Invalid TagName value: "' + tagName + '"'
            })
          }
        }
      }
    }
  }
}
