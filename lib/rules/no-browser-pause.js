'use strict'

/**
 * @fileoverview Check if browser.pause() is left in the codebase (no-browser-pause)
 * @author David Raynes
 */

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var object = node.callee.object
      var property = node.callee.property

      if (object && property && object.name === 'browser' && property.name === 'pause') {
        context.report(node, 'Unexpected browser.pause()')
      }
    }
  }
}
