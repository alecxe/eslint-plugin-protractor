'use strict'

/**
 * @fileoverview Rule to enforce return statements in callbacks of ElementArrayFinder's methods
 * @author Alexander Afanasyev (based on Toru Nagashima's work)
 */

var isElementArrayFinder = require('../is-element-array-finder')

var ANY_FUNCTION_PATTERN = /^(?:Function(?:Declaration|Expression)|ArrowFunctionExpression)$/
var TARGET_NODE_TYPE = /^(?:Arrow)?FunctionExpression$/
var TARGET_METHODS = /^(?:filter|map|reduce)$/

/**
 * Checks a given code path segment is reachable.
 *
 * @param {CodePathSegment} segment - A segment to check.
 * @returns {boolean} `true` if the segment is reachable.
 */
function isReachable (segment) {
  return segment.reachable
}

/**
 * Gets a readable location.
 *
 * - FunctionExpression -> the function name or `function` keyword.
 * - ArrowFunctionExpression -> `=>` token.
 *
 * @param {ASTNode} node - A function node to get.
 * @param {SourceCode} sourceCode - A source code to get tokens.
 * @returns {ASTNode|Token} The node or the token of a location.
 */
function getLocation (node, sourceCode) {
  if (node.type === 'ArrowFunctionExpression') {
    return sourceCode.getTokenBefore(node.body)
  }
  return node.id || node
}

/**
 * Finds a function node from ancestors of a node.
 * @param {ASTNode} node - A start node to find.
 * @returns {Node|null} A found function node.
 */
function getUpperFunction (node) {
  for (var currentNode = node; currentNode; currentNode = currentNode.parent) {
    if (ANY_FUNCTION_PATTERN.test(currentNode.type)) {
      return currentNode
    }
  }
  return null
}

/**
 * Checks whether or not a node is callee.
 * @param {ASTNode} node - A node to check.
 * @returns {boolean} Whether or not the node is callee.
 */
function isCallee (node) {
  return node.parent.type === 'CallExpression' && node.parent.callee === node
}

/**
 * Checks a given node is a MemberExpression node which has the specified name's
 * property.
 *
 * @param {ASTNode} node - A node to check.
 * @returns {boolean} `true` if the node is a MemberExpression node which has
 *      the specified name's property
 */
function isTargetMethod (node) {
  return (node.object && isElementArrayFinder(node.object) &&
          node.type === 'MemberExpression' &&
          node.property &&
          TARGET_METHODS.test(node.property.name)
  )
}

/**
 * Checks whether or not a given node is a function expression which is the
 * callback of an array method.
 *
 * @param {ASTNode} node - A node to check. This is one of
 *      FunctionExpression or ArrowFunctionExpression.
 * @returns {boolean} `true` if the node is the callback of an array method.
 */
function isCallbackOfArrayMethod (node) {
  while (node) {
    var parent = node.parent

    switch (parent.type) {
      case 'LogicalExpression':
      case 'ConditionalExpression':
        node = parent
        break

      case 'ReturnStatement':
        var func = getUpperFunction(parent)

        if (func === null || !isCallee(func)) {
          return false
        }
        node = func.parent
        break

      case 'CallExpression':
        if (isTargetMethod(parent.callee)) {
          return (parent.arguments.length >= 1 && parent.arguments[0] === node)
        }
        return false

      // Otherwise this node is not target.
      /* istanbul ignore next: unreachable */
      default:
        return false
    }
  }

  /* istanbul ignore next: unreachable */
  return false
}

module.exports = {
  meta: {
    schema: []
  },

  create: function (context) {
    var funcInfo = {
      upper: null,
      codePath: null,
      hasReturn: false,
      shouldCheck: false
    }

    /**
     * Checks whether or not the last code path segment is reachable.
     * Then reports this function if the segment is reachable.
     *
     * If the last code path segment is reachable, there are paths which are not
     * returned or thrown.
     *
     * @param {ASTNode} node - A node to check.
     * @returns {void}
     */
    function checkLastSegment (node) {
      if (funcInfo.shouldCheck &&
        funcInfo.codePath.currentSegments.some(isReachable)
      ) {
        context.report({
          node: node,
          loc: getLocation(node, context.getSourceCode()).loc.start,
          message: funcInfo.hasReturn
            ? 'Expected to return a value at the end of this function'
            : 'Expected to return a value in this function'
        })
      }
    }

    return {
      // Stacks this function's information.
      'onCodePathStart': function (codePath, node) {
        funcInfo = {
          upper: funcInfo,
          codePath: codePath,
          hasReturn: false,
          shouldCheck: TARGET_NODE_TYPE.test(node.type) &&
                       node.body.type === 'BlockStatement' &&
                       isCallbackOfArrayMethod(node)
        }
      },

      // Pops this function's information.
      'onCodePathEnd': function () {
        funcInfo = funcInfo.upper
      },

      // Checks the return statement is valid.
      'ReturnStatement': function (node) {
        if (funcInfo.shouldCheck) {
          funcInfo.hasReturn = true

          if (!node.argument) {
            context.report({
              node: node,
              message: 'Expected a return value'
            })
          }
        }
      },

      // Reports a given function if the last path is reachable.
      'FunctionExpression:exit': checkLastSegment,
      'ArrowFunctionExpression:exit': checkLastSegment
    }
  }
}
