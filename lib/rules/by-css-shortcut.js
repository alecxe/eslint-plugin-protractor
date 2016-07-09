'use strict'

/**
 * @fileoverview Recommend using $ and $$ shortcuts instead of element(by.css()) and element.all(by.css()) respectively
 * @author Alexander Afanasyev
 */

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'CallExpression': function (node) {
        var object = node.callee.object
        var property = node.callee.property

        if (object && property && object.name === 'by' && property.name === 'css') {
          var parent = node.parent
          if (parent && parent.callee) {
            if ((parent.callee.name === 'element') ||
              (parent.callee.property && parent.callee.property.name === 'element')) {
              context.report({
                node: node,
                message: 'Unexpected element(by.css()), use $ shortcut instead'
              })
            } else if (parent.callee.property && parent.callee.property.name === 'all') {
              context.report({
                node: node,
                message: 'Unexpected element.all(by.css()), use $$ shortcut instead'
              })
            }
          }
        }
      }
    }
  }
}
