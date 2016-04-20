'use strict'

var expect = require('chai').expect

var validator = require('../exercise0')

describe('Given a validator', function() {

  describe('when a set of valid data is provided', function() {

    it('then the validator returns true', function () {
      var validatorObj = new validator()
      expect(validatorObj.validateThis('A Valid String')).to.be.true
    })

  })

  describe('when a set of invalid data is provided', function () {

    it('then the validator returns false', function() {
      var validateObj = new validator()
      expect(validateObj.validateThis('This is not a valid string')).to.be.false
    })
  })
})
