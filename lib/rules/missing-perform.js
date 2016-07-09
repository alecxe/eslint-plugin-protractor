'use strict'

/**
 * @fileoverview perform() has to be called on browser.actions()
 * @author Alexander Afanasyev
 */

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      'MemberExpression': function (node) {
        var object = node.object
        var property = node.property

        // find browser.actions() code parts
        if (property && object && property.name === 'actions' && object.name === 'browser') {
          // here is a tricky part - getting the parent nodes
          // continue searching for perform call only if there is something called on browser.actions()
          var parent = node.parent.parent
          var performMissing = true

          if (parent.type === 'MemberExpression') {
            while (parent) {
              if (parent.property && parent.property.name === 'perform') {
                performMissing = false
                break
              }

              parent = parent.parent
            }

            if (performMissing) {
              context.report({
                node: node,
                message: 'No perform() called on browser.actions()'
              })
            }
          }
        }
      }
    }
  }
}
