'use strict'

/**
 * @fileoverview Discourage using Angular CSS classes inside CSS selectors
 * @author Alexander Afanasyev
 */

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
      var object = node.callee.object
      var property = node.callee.property

      if (node.arguments) {
        var insideByCss = object && property && object.name === 'by' && property.name === 'css'
        var dollarShortcuts = node.callee.name === '$' || node.callee.name === '$$'
        var chainedDollarShortcuts = property && (property.name === '$' || property.name === '$$')

        if (insideByCss || dollarShortcuts || chainedDollarShortcuts) {
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
