'use strict'

/**
 * @fileoverview Discourage repeating locators
 * @author Alexander Afanasyev
 */

var getLocator = require('../get-locator')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    // locators collects locators grouped by type, e.g.: {css: [".test", "div:first-of-type"], id: ["myid1", "myid2"]}
    var locators = {}

    return {
      CallExpression: function (node) {
        var locator = getLocator(node)
        if (locator && locator.value) {
          // find exact locator duplicates (both by and value were met before)
          if (locator.by in locators && locators[locator.by].indexOf(locator.value) >= 0) {
            context.report({
              node: node,
              message: 'Repetitive locator detected'
            })
          }

          // maintain "locators" object
          if (!(locator.by in locators)) {
            locators[locator.by] = [locator.value]
          } else {
            locators[locator.by].push(locator.value)
          }
        }
      }
    }
  }
}
