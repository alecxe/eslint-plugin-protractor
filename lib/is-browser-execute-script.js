'use strict'

/**
 * @fileoverview Utility function to determine if a node is a browser.executeScript() or browser.driver.executeScript() or browser.executeAsyncScript() or browser.driver.executeAsyncScript() call
 * @author Alexander Afanasyev
 */
module.exports = function (node) {
  var object = node.callee.object
  var property = node.callee.property

  if (object && property) {
    var isExecuteScript = property.name === 'executeScript'
    var isExecuteAsyncScript = property.name === 'executeAsyncScript'

    if (!isExecuteScript && !isExecuteAsyncScript) {
      return false
    }

    var isBrowser = object.name === 'browser'

    var isBrowserCallee = object.object && object.object.name === 'browser'
    var isDriverProperty = object.property && object.property.name === 'driver'

    var isBrowserDriver = isBrowserCallee && isDriverProperty

    if (isBrowser || isBrowserDriver) {
      var objectName = isBrowser ? 'browser' : 'browser.driver'
      var methodName = isExecuteScript ? 'executeScript()' : 'executeAsyncScript()'
      return objectName + '.' + methodName
    }

    return false
  }
}
