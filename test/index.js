'use strict'

var expect = require('chai').expect
var fs = require('fs')
var path = require('path')
var baseDir = path.join(__dirname, '../')
var rulesDir = path.join(__dirname, '../lib/rules/')
var documentationPath = 'docs/rules/'
var documentationDir = path.join(__dirname, '../', documentationPath)
var plugin = require('..')

describe('eslint-plugin-protractor', function () {
  var ruleFiles

  before(function (done) {
    fs.readdir(rulesDir, function (error, files) {
      ruleFiles = files
      done(error)
    })
  })

  it('should expose all rules', function () {
    ruleFiles.forEach(function (file) {
      var ruleName = path.basename(file, '.js')

      expect(plugin).to.have.deep.property('rules.' + ruleName)
        .that.equals(require(rulesDir + ruleName))
    })
  })

  it('should expose recommended configuration for all rules', function () {
    ruleFiles.forEach(function (file) {
      var ruleName = path.basename(file, '.js')

      expect(plugin).to.have.deep.property('configs.recommended.rules')
        .that.has.property('protractor/' + ruleName)
        .that.is.oneOf([0, 1, 2, 'off', 'warn', 'error'])
    })
  })

  describe('documentation', function () {
    var documentationFiles
    var documentationIndex

    before(function (done) {
      fs.readdir(documentationDir, function (readDirError, files) {
        if (readDirError) {
          done(readDirError)
          return
        }

        documentationFiles = files

        fs.readFile(baseDir + 'README.md', function (error, data) {
          documentationIndex = data.toString()
          done(error)
        })
      })
    })

    it('should have each rule documented', function () {
      ruleFiles.forEach(function (file) {
        var ruleName = path.basename(file, '.js')
        var expectedDocumentationFileName = ruleName + '.md'

        expect(documentationFiles).to.contain(expectedDocumentationFileName)
      })
    })

    it('should be linked in the documenation index', function () {
      documentationFiles.forEach(function (file) {
        var ruleName = path.basename(file, '.md')
        var expectedLink = '[' + ruleName + ']: ' + documentationPath + file

        expect(documentationIndex).to.contain(expectedLink)
      })
    })
  })
})
