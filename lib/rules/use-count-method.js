'use strict'

/**
 * @fileoverview Recommend using `count()` instead of `then()` and `length`
 * @author Alexander Afanasyev
 */

var isElementArrayFinder = require('../is-element-array-finder')
var isThenCallBack = require('../is-then-callback')
var isExpect = require('../is-expect')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    return {
      MemberExpression: function (node) {
        if (node.property && node.object && node.property.name === 'length') {
          // remember the variable name the ".length" was used on
          var variableName = node.object.name

          // find out if we are in an expect()
          var expectAncestor
          var thenAncestor
          var ancestors = context.getAncestors(node)

          for (var i = 0; i < ancestors.length; i++) {
            expectAncestor = ancestors[i]
            if (expectAncestor && expectAncestor.type === 'CallExpression' && isExpect(expectAncestor)) {
              // find out if we are inside a then callback
              ancestors = context.getAncestors(expectAncestor)
              for (var j = 0; j < ancestors.length; j++) {
                thenAncestor = ancestors[j]
                if (thenAncestor && thenAncestor.type === 'CallExpression') {
                  var thenCallbackArgument = isThenCallBack(thenAncestor)

                  // the same variable is a "then" callback function argument
                  if (thenCallbackArgument && thenCallbackArgument.name === variableName) {
                    // check that it was an ElementArrayFinder resolution
                    if (thenAncestor.callee && thenAncestor.callee.object) {
                      if (isElementArrayFinder(thenAncestor.callee.object)) {
                        context.report({
                          node: node,
                          message: 'Array.length inside promise resolution function detected. Use count() instead.'
                        })
                        return
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
