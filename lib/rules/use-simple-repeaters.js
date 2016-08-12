'use strict'

/**
 * @fileoverview Discourage using extended ng-repeat syntax in by.repeater() locators
 * @author Alexander Afanasyev
 */

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments[0] && node.arguments[0].hasOwnProperty('value')) {
          var object = node.callee.object
          var property = node.callee.property

          if (object && property && object.name === 'by' && property.name === 'repeater') {
            var repeaterValue = node.arguments[0].value
            if (repeaterValue) {
              if (repeaterValue.indexOf('|') > 0) {
                context.report({
                  node: node,
                  message: 'Unexpected filter inside a by.repeater() locator.'
                })
              }

              if (repeaterValue.indexOf('track by') > 0) {
                context.report({
                  node: node,
                  message: 'Unexpected "track by" inside a by.repeater() locator.'
                })
              }
            }
          }
        }
      }
    }
  }
}
