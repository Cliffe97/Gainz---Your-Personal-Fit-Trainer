'use strict'
const RepWorkout = require( '../models/AddRepWorkout' );
console.log("loading the createRepWorkout Controller")

exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('createRepWorkout')
}

exports.saveRepWorkout = ( req, res ) => {
  console.log("in saveRepWorkout!")
  console.dir(req)
  let repWorkout = new RepWorkout( {
    workoutName: req.body.workoutName,
    repetitions: req.body.repetitions,
    setsAndRounds: req.body.setsAndRounds
  } )

  console.log("repWorkout = "+repWorkout)

  repWorkout.save()
    .then( () => {
      res.redirect( '/createRepWorkout' );
    } )
    .catch( error => {
      res.send( error );
    } );
};
