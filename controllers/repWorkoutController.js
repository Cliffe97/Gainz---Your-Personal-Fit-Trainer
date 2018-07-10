'use strict'
const RepWorkout = require( '../models/AddRepWorkout' );
console.log("loading the createRepWorkout Controller")

exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('repWorkout')
}

exports.getAllRepWorkout = ( req, res ) => {
  console.log('in getAllRepWorkout')
  RepWorkout.find( {} )
    .exec()
    .then( ( repWorkout ) => {
      res.render( 'repWorkout', {
        repWorkout: repWorkout
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'RepWorkout promise complete' );
    } );
};
