'use strict'
const IntervalWorkout = require( '../models/AddIntervalWorkout' );
console.log("loading the createIntervalWorkout Controller")

exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('intervalWorkout')
}

exports.getAllIntervalWorkout = ( req, res ) => {
  console.log('in getAllIntervalWorkout')
  IntervalWorkout.find( {} )
    .exec()
    .then( ( intervalWorkout ) => {
      res.render( 'intervalWorkout', {
        intervalWorkout: intervalWorkout
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'IntervalWorkout promise complete' );
    } );
};
