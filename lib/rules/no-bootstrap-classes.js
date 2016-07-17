'use strict'

/**
 * @fileoverview Discourage using Bootstrap layout-oriented CSS classes inside CSS selectors
 * @author Alexander Afanasyev
 */
var isCSSLocator = require('../find-css-locator')
var bootstrapClasses = require('../bootstrap-layout-classes')
var extractClassNames = require('../extract-class-names')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isCSSLocator(node)) {
            var extractedClassNames = extractClassNames(node.arguments[0].value)

            for (var i = 0; i < bootstrapClasses.length; i++) {
              if (extractedClassNames.indexOf(bootstrapClasses[i]) >= 0) {
                context.report({
                  node: node,
                  message: 'Unexpected Bootstrap class "' + bootstrapClasses[i] + '" inside a CSS selector'
                })
              }
            }
          }
        }
      }
    }
  }
}
