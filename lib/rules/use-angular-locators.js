'use strict'

/**
 * @fileoverview Recommend using built-in Angular-specific locators
 * @author Alexander Afanasyev
 */
var isCSSLocator = require('../find-css-locator')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    var attributeToLocatorMap = {
      'ng-model': ['by.model()'],
      'ng-bind': ['by.binding()', 'by.exactBinding()'],
      'ng-repeat': ['by.repeater()', 'by.exactRepeater()'],
      'ng-options': ['by.options()']
    }

    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isCSSLocator(node)) {
            Object.keys(attributeToLocatorMap).forEach(function (key) {
              if (node.arguments[0].value.indexOf(key) >= 0) {
                context.report({
                  node: node.arguments[0],
                  message: 'Unexpected "' + key + '" attribute used inside a CSS selector. Use ' + attributeToLocatorMap[key].join(' or ') + ' locator instead'
                })
              }
            })
          }
        }
      }
    }
  }
}
