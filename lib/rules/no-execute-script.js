'use strict'

/**
 * @fileoverview Recommend against executing scripts in specs and page objects
 * @author Alexander Afanasyev
 */

var isBrowserExecuteScript = require('../is-browser-execute-script')

var PLUGIN_NAME = 'eslint-plugin-protractor'
var multimatch = require('multimatch')

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    // do nothing if appropriate settings are not present
    var settings = context.settings
    if (!settings || !settings[PLUGIN_NAME] || !settings[PLUGIN_NAME].paths || !(settings[PLUGIN_NAME].paths.po || settings[PLUGIN_NAME].paths.specs)) {
      return {}
    }

    // get glob matches
    var filename = context.getFilename()
    var patternsPO = settings[PLUGIN_NAME].paths.po || []
    var patternsSpecs = settings[PLUGIN_NAME].paths.specs || []
    var matches = multimatch(filename, patternsPO.concat(patternsSpecs))

    // do nothing if a filename does not match pre-configured patterns
    if (matches.length === 0) {
      return {}
    }

    return {
      'CallExpression': function (node) {
        var result = isBrowserExecuteScript(node)

        if (result) {
          context.report({
            node: node,
            message: 'Unexpected "' + result + '"'
          })
        }
      }
    }
  }
}
