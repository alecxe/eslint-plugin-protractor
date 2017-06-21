'use strict'

/**
 * @fileoverview Prohibit creating invalid CSS selectors
 * @author Alexander Afanasyev
 */
var isCSSLocator = require('../find-css-locator')
var parser = require('../get-css-parser')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isCSSLocator(node)) {
            var cssSelector = node.arguments[0].value
            try {
              parser.parse(cssSelector)
            } catch (err) {
              context.report({
                node: node.arguments[0],
                message: 'Invalid CSS selector: "' + cssSelector + '"'
              })
            }
          }
        }
      }
    }
  }
}
