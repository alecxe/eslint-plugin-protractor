'use strict'

/**
 * @fileoverview Prohibit incorrect chaining of `element` and `element.all`
 * @author Alexander Afanasyev
 */

module.exports = {
  meta: {
    fixable: 'code',
    schema: []
  },

  create: function (context) {
    function isElementAllChained (node) {
      var property = node.property
      if (property && property.name === 'element') {
        var parent = node.parent
        if (parent && parent.type === 'MemberExpression') {
          var parentProperty = parent.property
          return parentProperty && parentProperty.name === 'all'
        }
      }
      return false
    }

    function createCorrectChainingAutoFixFunction (node) {
      var property = node.property
      var startRange = property.range[0] - 1  // -1 to get the "." as well
      var endRange = property.range[1]

      return function (fixer) {
        // remove .element from .element.all incorrect chain
        if (property && property.name === 'element') {  // self-check
          return fixer.removeRange([startRange, endRange])
        }
      }
    }

    return {
      MemberExpression: function (node) {
        if (isElementAllChained(node)) {
          context.report({
            node: node,
            message: 'Incorrect "element" and "element.all" chaining detected',
            fix: createCorrectChainingAutoFixFunction(node)
          })
        }
      }
    }
  }
}
