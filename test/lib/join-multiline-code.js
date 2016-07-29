'use strict'

/**
 * @fileoverview Utility function to generate multi-line code from an array of code lines
 */
module.exports = function toCode (lines, description) {
  return (description ? '// ' + description : '') + '\n' + lines.join('\n')
}
