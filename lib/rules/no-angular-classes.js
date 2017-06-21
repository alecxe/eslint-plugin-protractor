'use strict'

/**
 * @fileoverview Discourage using Angular CSS classes inside CSS selectors
 * @author Alexander Afanasyev
 */
var isCSSLocator = require('../find-css-locator')
var extractClassNames = require('../extract-class-names')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    var prohibitedClasses = [
      'ng-scope',
      'ng-isolate-scope',
      'ng-binding',
      'ng-valid',
      'ng-invalid',
      'ng-pristine',
      'ng-dirty',
      'ng-touched',
      'ng-untouched'
    ]

    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isCSSLocator(node)) {
            var extractedClassNames = extractClassNames(node.arguments[0].value)

            for (var i = 0; i < prohibitedClasses.length; i++) {
              if (extractedClassNames.indexOf(prohibitedClasses[i]) >= 0) {
                context.report({
                  node: node.arguments[0],
                  message: 'Unexpected Angular class "' + prohibitedClasses[i] + '" inside a CSS selector'
                })
              }
            }
          }
        }
      }
    }
  }
}
