'use strict'

/**
 * @fileoverview Disallow using `ElementArrayFinder` methods on `ElementFinder`
 * @author Alexander Afanasyev
 */

var isElementFinder = require('../is-element-finder')
var elementArrayFinderMethods = [
  'first',
  'last',
  'get',
  'filter',
  'map',
  'each',
  'reduce',
  'count'
]

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      MemberExpression: function (node) {
        var property = node.property

        if (property && elementArrayFinderMethods.indexOf(property.name) > -1) {
          if (isElementFinder(node.object)) {
            context.report({
              node: node,
              message: 'Unexpected "' + property.name + '()" call on ElementFinder'
            })
          }
        }
      }
    }
  }
}
