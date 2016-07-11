'use strict'

var rule = require('../../lib/rules/array-callback-return')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester()

ruleTester.run('array-callback-return', rule, {
  valid: [
    '',
    'foo.filter();',
    'filter("test");',
    'obj.filter(function () { /* comment */ });',
    '$$(".myclass").filter();',
    'foo.filter(function() { return true; })',
    'foo.map(function() { return true; })',
    'foo.reduce(function() { return true; })',
    'foo.filter(function() {})',
    'foo.map(function() {})',
    'foo.reduce(function() {})',
    'var elements = element.all(by.css(".myclass"));',
    'var elements = $$(".myclass");',
    'var elements = $$(".myclass").filter;',
    'element.all(by.css(".myclass")).filter();',
    'function test () { element.all(by.css(".myclass")).filter(); }',
    'element.all(by.css(".myclass")).filter(function() { return true; })',
    'element(by.id("myid")).all(by.css(".myclass")).map(function() { return true; })',
    '$$(".myclass").reduce(function() { return true; })',
    'element(by.id("myid")).$$(".myclass").reduce(function() { return true; })',
    '$$(".myclass").filter(function(){ return function() { return; }; })',
    '$$(".myclass").reduce(function(){}())',
    '$$(".myclass").reduce(function() { switch (a) { case 0: bar(); default: return true; } })',
    '$$(".myclass").map(function() { try { bar(); return true; } catch (err) { return false; } })',
    '$$(".myclass").filter(function(){ return function() { return; }; })',
    '$$(".myclass").filter(function() { if (a) return true; else return false; })',
    {
      code: '$$(".myclass").filter(() => { return true; })',
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: '$$(".myclass").filter(() => true)',
      parserOptions: { ecmaVersion: 6 }
    },
    'element.all(by.css(".myclass")).filter(function(elm) { return elm.getText().then(function (text) { return text.indexOf("test") >= 0; }) });'
  ],
  invalid: [
    {
      code: 'element.all(by.css(".myclass")).filter(function() {})',
      errors: ['Expected to return a value in this function']
    },
    {
      code: 'element.all(by.css(".myclass")).filter(function() { var a = 1; })',
      errors: ['Expected to return a value in this function']
    },
    {
      code: 'element.all(by.css(".myclass")).map(function() {})',
      errors: ['Expected to return a value in this function']
    },
    {
      code: 'element(by.id("myid")).all(by.css(".myclass")).reduce(function() {})',
      errors: ['Expected to return a value in this function']
    },
    {
      code: '$$(".myclass").filter(function cb() { if (a) return true; })',
      errors: ['Expected to return a value at the end of this function']
    },
    {
      code: 'element(by.id("myid")).$$(".myclass").filter(function() { switch (a) { case 0: break; default: return true; } })',
      errors: ['Expected to return a value at the end of this function']
    },
    {
      code: '$$(".myclass").filter(function() { try { bar(); } catch (err) { return true; } })',
      errors: ['Expected to return a value at the end of this function']
    },
    {
      code: '$$(".myclass").filter(function() { return; })',
      errors: ['Expected a return value']
    },
    {
      code: '$$(".myclass").filter(function() { if (a) return; })',
      errors: ['Expected to return a value at the end of this function', 'Expected a return value']
    },
    {
      code: '$$(".myclass").filter(function() { if (a) return; else return; })',
      errors: ['Expected a return value', 'Expected a return value']
    },
    {
      code: '$$(".myclass").filter(cb || function() {})',
      errors: ['Expected to return a value in this function']
    },
    {
      code: '$$(".myclass").filter(a ? function() {} : function() {})',
      errors: ['Expected to return a value in this function', 'Expected to return a value in this function']
    },
    {
      code: '$$(".myclass").filter(function(){ return function() {}; }())',
      errors: ['Expected to return a value in this function']
    },
    {
      code: '$$(".myclass").filter(() => {});',
      parserOptions: { ecmaVersion: 6 },
      errors: ['Expected to return a value in this function']
    },
    {
      code: '$$(".myclass").map(function() { try { bar(); } catch (err) { return true; } })',
      errors: ['Expected to return a value at the end of this function']
    },
    {
      code: 'element.all(by.css(".myclass")).filter(function(elm) { elm.getText().then(function (text) { return text.indexOf("test") >= 0; }) });',
      errors: ['Expected to return a value in this function']
    }
  ]
})
