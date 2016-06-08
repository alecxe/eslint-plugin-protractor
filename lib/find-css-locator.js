'use strict'

/**
 * @fileoverview Utility function to determine if a node contains a Protractor CSS locator
 * @author Alexander Afanasyev
 */
module.exports = function (node) {
  var object = node.callee.object
  var property = node.callee.property

  var insideByCss = object && property && object.name === 'by' && property.name === 'css'
  var dollarShortcuts = node.callee.name === '$' || node.callee.name === '$$'
  var chainedDollarShortcuts = property && (property.name === '$' || property.name === '$$')

  return insideByCss || dollarShortcuts || chainedDollarShortcuts
}
