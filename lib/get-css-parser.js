'use strict'

/**
 * @fileoverview Utility function to set up and configure CSS selector parser
 * @author Alexander Afanasyev
 */

// setup up CSS selector parser
var CssSelectorParser = require('css-selector-parser').CssSelectorParser
var parser = new CssSelectorParser()

parser.registerSelectorPseudos('has', 'contains')
parser.registerNestingOperators('>', '+', '~')
parser.registerAttrEqualityMods('^', '$', '*', '~', '|')
parser.enableSubstitutes()

module.exports = parser
