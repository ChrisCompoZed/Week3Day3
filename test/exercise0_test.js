'use strict'

var expect = require('chai').expect

var validator = require('../exercise0')

describe('Given a validator', function() {

  var carValidatations = {
    make: {type: 'string', length: { greaterThan: 0 } },
    model: {type: 'string', length: { greaterThan: 0 } },
    year: {type: 'number'}
    }

  var carValidator

  beforeEach( function () {
    carValidator = new validator(carValidatations)
  })

  describe('when no data is provided', function () {
    it('then the validator throws an error', function () {
      function invalidObjectPassed(){
        carValidator.validateThis()
      }
      expect(invalidObjectPassed).to.throw(/Invalid object passed/)
    })
  })

  describe('when empty data is provided', function () {
    it('then the validator throws an error', function () {
      function emptyObjectPassed(){
        carValidator.validateThis({})
      }
      expect(emptyObjectPassed).to.throw(/Empty object passed/)
    })
  })

  describe('when a set of valid data is provided', function() {

    var validCar = {
      make: 'Honda',
      model: 'Accord',
      year: 1964
    }

    it('then the validator returns true', function () {

      expect(carValidator.validateThis(validCar)).to.be.true
    })

  })

  describe('when a set of invalid data is provided', function () {

    var invalidCar = {
      make: '',
      model: 'Accord',
      year: 1964
    }
    it('then the validator returns false', function() {
      expect(carValidator.validateThis(invalidCar)).to.be.false
    })

    it('the validator returns a message stating the make is too short', function () {
      carValidator.validateThis(invalidCar)
      expect(carValidator.validationMessage[0]).to.equal('The make is Too Short')
    })

    var invalidCar2 = {
      make: 'Honda',
      model: '',
      year: 1964
    }
    it('the validator returns a message stating the model is too short', function () {
      carValidator.validateThis(invalidCar2)
      expect(carValidator.validationMessage[0]).to.equal('The model is Too Short')
    })

    var invalidCar3 = {
      make: 'Honda',
      model: 'Accord',
      year: '1964'
    }
    it('the validator returns a message stating that the year is not a number', function () {
      carValidator.validateThis(invalidCar3)
      expect(carValidator.validationMessage[0]).to.equal('The year is not a number')
    })

    var invalidCar4 = {
      make: 233564,
      model: 'Accord',
      year: 1964
    }
    it('the validator returns a message stating that the make is not a string', function () {
      carValidator.validateThis(invalidCar4)
      expect(carValidator.validationMessage[0]).to.equal('The make is not a string')
    })

    var invalidCar5 = {
      make: 233564,
      model: '',
      year: '1964'
    }
    it('the validator returns 3 messages', function () {
      carValidator.validateThis(invalidCar5)
      var messages = carValidator.validationMessage
      expect(messages.length).to.equal(3)
      expect(messages[0]).to.equal('The make is not a string')
      expect(messages[1]).to.equal('The model is Too Short')
      expect(messages[2]).to.equal('The year is not a number')
    })

  })
})
