'use strict'

/**
 * @fileoverview Discourage use of selectors within describe blocks.
 * @author David Adams
 */

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var object = node.callee.object

      if (object && object.name === 'by') {
        // Use ancestors to determine if 'by' is contained within a describe() block.
        for (var i = 0; i < context.getAncestors().length; i++) {
          var parent = context.getAncestors()[i]
          if (parent.type === 'CallExpression' && parent.callee.name === 'describe') {
            context.report(node, 'Unexpected selector in describe block')
            break
          }
        }
      }
    }
  }
}
