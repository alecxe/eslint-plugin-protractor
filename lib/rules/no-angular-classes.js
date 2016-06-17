'use strict'

/**
 * @fileoverview Discourage using Angular CSS classes inside CSS selectors
 * @author Alexander Afanasyev
 */
var isCSSLocator = require('../find-css-locator')

module.exports = function (context) {
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
          for (var i = 0; i < prohibitedClasses.length; i++) {
            if (node.arguments[0].value.indexOf(prohibitedClasses[i]) >= 0) {
              context.report(node, 'Unexpected Angular class "' + prohibitedClasses[i] + '" inside a CSS selector')
            }
          }
        }
      }
    }
  }
}
