'use strict'

/**
 * @fileoverview Don't allow to shadow the built-in Protractor globals
 * @author Alexander Afanasyev
 */

module.exports = function (context) {
  var protractorGlobals = [
    'browser',
    'protractor',
    'element',
    'by',
    '$',
    '$$'
  ]

  function checkVariables (node) {
    var variables = context.getDeclaredVariables(node)
    for (var i = 0; i < variables.length; ++i) {
      if (protractorGlobals.indexOf(variables[i].name) !== -1) {
        context.report(node, 'Unexpected Protractor built-in global variable shadowing')
      }
    }

    // handling switch manually - getDeclaredVariables() does not return the switch discriminant
    if (node.type === 'SwitchStatement' && node.discriminant) {
      if (protractorGlobals.indexOf(node.discriminant.name) !== -1) {
        context.report(node, 'Unexpected Protractor built-in global variable shadowing')
      }
    }
  }

  return {
    'VariableDeclaration': checkVariables,
    'FunctionDeclaration': checkVariables,
    'FunctionExpression': checkVariables,
    'CatchClause': checkVariables,
    'SwitchStatement': checkVariables
  }
}
