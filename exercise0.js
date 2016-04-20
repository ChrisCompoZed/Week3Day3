'use strict'

class validator{

  validateThis(inputString){
    var validString = false
    if(inputString === 'A Valid String'){
      validString = true
    }
    return validString
  }
}

module.exports = validator
