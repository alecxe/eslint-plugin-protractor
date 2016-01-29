'use strict'

/**
 * @fileoverview perform() has to be called on browser.actions()
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  return {
    'MemberExpression': function (node) {
      // find browser.actions() code parts
      if (node.property.name === 'actions' && node.object.name === 'browser') {
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

            node = parent
            parent = node.parent
          }

          if (performMissing) {
            context.report(node, 'No perform() called on browser.actions()')
          }
        }
      }
    }
  }
}
