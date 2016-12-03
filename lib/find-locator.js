'use strict'

/**
 * @fileoverview Utility function to determine if a node contains a given Protractor locator
 * @author Alexander Afanasyev
 */
module.exports = function (node, locator) {
  var object = node.callee.object
  var property = node.callee.property

  return object && property && object.name === 'by' && property.name === locator
}
