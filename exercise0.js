'use strict'

class validator {

  constructor(valCriteria) {
      this._valCriteria = valCriteria
      this._validationMessage = []
  }

  get validationMessage(){
    return this._validationMessage
  }

  validateThis(inputObject){
    var validObject = false




    if(typeof inputObject === 'undefined'){
      throw 'Invalid object passed'
    }
    if (Object.keys(inputObject).length===0) {
      throw 'Empty object passed'
    }

    // putthis in reduce
    var invalidObj = false
    for (var key in inputObject) {

      if (this._valCriteria.hasOwnProperty(key)) {

        var dataTypes = Object.keys(this._valCriteria[key]);

          for(var dataType in dataTypes){

              switch(dataTypes[dataType]){
                case 'type':
                  if(typeof inputObject[key] !== this._valCriteria[key].type) {
                  invalidObj= true
                  this._validationMessage.push('The '+ key + ' is not a ' + this._valCriteria[key].type)
                  }
                  break;

                case 'length':
                  if (this._valCriteria[key].length.hasOwnProperty('greaterThan')){

                    if (inputObject[key] <= this._valCriteria[key].length.greaterThan){
                      invalidObj= true
                      this._validationMessage.push('The ' + key + ' is Too Short')
                    }
                  }
                  break;
              }
            }
          }
        }


        // var isvalid = Object.keys(inputObject).reduce(applyValidation, true)
        // console.log('Result of Array Reduce = ' + isvalid)
        //
        // function applyValidation(result, element) {
        //
        //   if (inputObject.hasOwnProperty(element)) {
        //
        //     var dataTypes = Object.keys(inputObject[element]);
        //
        //       for(var dataType in dataTypes){
        //
        //           switch(dataTypes[dataType]){
        //             case 'type':
        //               if(typeof inputObject[element] !== inputObject[element].type) {
        //               invalidObj= true
        //               this._validationMessage.push('The '+ element + ' is not a ' + inputObject[element].type)
        //               }
        //               break;
        //
        //             case 'length':
        //               if (inputObject[element].length.hasOwnProperty('greaterThan')){
        //
        //                 if (inputObject[element] <= inputObject[element].length.greaterThan){
        //                   invalidObj= true
        //                   this._validationMessage.push('The ' + element + ' is Too Short')
        //                 }
        //               }
        //               break;
        //           }
        //         }
        //       }
        //
        //   return true;
        //
        // }

        // if (this._valCriteria[key].hasOwnProperty('type')) {
        //
        //      if(typeof inputObject[key] !== this._valCriteria[key].type) {
        //      invalidObj= true
        //      this._validationMessage += 'The '+ key + ' is not a ' + this._valCriteria[key].type
        //   }
        // }
        //
        // if (this._valCriteria[key].hasOwnProperty('length')) {
        //
        //    if (this._valCriteria[key].length.hasOwnProperty('greaterThan'))
        //    {
        //      if (inputObject[key] <= this._valCriteria[key].length.greaterThan){
        //        invalidObj= true
        //        this._validationMessage += 'The ' + key + ' is Too Short'
        //      }
        //
        //    }
        //  }

    // if(typeof inputObject.make === this._valCriteria.make.type && inputObject.make.length > this._valCriteria.make.length.greaterThan &&
    //     typeof inputObject.model === this._valCriteria.model.type && inputObject.model.length > this._valCriteria.model.length.greaterThan &&
    //       typeof inputObject.year === this._valCriteria.year.type){
    //   validObject = true
    // }else{
    //   this._validationMessage = 'The Make is Too Short'
    // }
    return !invalidObj
  }


}

module.exports = validator
