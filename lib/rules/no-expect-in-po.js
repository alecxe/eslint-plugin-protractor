'use strict'

/**
 * @fileoverview Recommend against making assertions inside Page Objects
 * @author Alexander Afanasyev
 */

var PLUGIN_NAME = 'eslint-plugin-protractor'
var multimatch = require('multimatch')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    // do nothing if appropriate settings are not present
    var settings = context.settings
    if (!settings || !settings[PLUGIN_NAME] || !settings[PLUGIN_NAME].paths || !settings[PLUGIN_NAME].paths.po) {
      return {}
    }

    // get glob matches
    var filename = context.getFilename()
    var patterns = settings[PLUGIN_NAME].paths.po
    var matches = multimatch(filename, patterns)

    // do nothing if a filename does not match pre-configured patterns
    if (matches.length === 0) {
      return {}
    }

    return {
      'CallExpression': function (node) {
        var callee = node.callee

        if (callee && callee.name === 'expect') {
          context.report({
            node: node,
            message: 'Unexpected "expect()" inside a Page Object'
          })
        }
      }
    }
  }
}
