'use strict'

/**
 * @fileoverview Utility function to determine if a node is a browser.get() or browser.driver.get() call
 * @author Alexander Afanasyev
 */
module.exports = function (node) {
  var object = node.callee.object
  var property = node.callee.property

  if (object && property && property.name === 'get') {
    var isBrowser = object.name === 'browser'
    var isBrowserDriver = object.object && object.object.name === 'browser' &&
                                           object.property && object.property.name === 'driver'
    if (isBrowser || isBrowserDriver) {
      return {
        'browserGet': isBrowser,
        'browserDriverGet': isBrowserDriver
      }
    }
  }

  return false
}
