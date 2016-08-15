'use strict'

/**
 * @fileoverview Discourage using Angular attributes inside CSS selectors
 * @author Alexander Afanasyev
 */
var isCSSLocator = require('../find-css-locator')
var extractAttributes = require('../extract-attributes')

var ANGULAR_ATTR_RE = /^(ng-|data-ng-|x-ng-)/

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        if (node.arguments && node.arguments.length && node.arguments[0].hasOwnProperty('value')) {
          if (isCSSLocator(node)) {
            var extractedAttributes = extractAttributes(node.arguments[0].value)

            extractedAttributes.forEach(function (extractedAttribute) {
              if (ANGULAR_ATTR_RE.test(extractedAttribute)) {
                context.report({
                  node: node,
                  message: 'Unexpected Angular attribute "' + extractedAttribute + '" inside a CSS selector'
                })
              }
            })
          }
        }
      }
    }
  }
}
