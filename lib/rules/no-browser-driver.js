'use strict'

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    // console.log(context)
    return {
      'MemberExpression': function (node) {
        var object = node.object
        if (object.name === 'browser') {
          // when trying `var d = browser.driver;`
          object = node
        }
        if (object.object && object.object.name === 'browser' &&
          object.property && object.property.name === 'driver') {
          context.report({
            node: node,
            message: 'Unexpected use of browser.driver instead of browser'
          })
        }
      }
    }
  }
}
