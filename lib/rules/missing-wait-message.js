'use strict'

/**
 * @fileoverview Missing wait timeout message in browser.wait() (missing-wait-message)
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var objectName = node.callee.object.name
      var propertyName = node.callee.property.name

      if (propertyName === 'wait' && objectName === 'browser' && node.arguments.length < 3) {
        context.report(node, 'No timeout message provided for browser.wait()')
      }
    }
  }
}
