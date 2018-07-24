'use strict'
const Exercise = require( '../models/Exercise' );
const user = require('../models/user');
console.log("loading the Exercise Controller")

// exports.renderMain =  (req,res) => {
//   //console.log("in the swController.renderMain")
//   res.render('repWorkout')
// }

exports.renderExerciseForm = ( req, res ) => {
  res.render( 'exerciseForm');
};

exports.getAllWorkouts = ( req, res ) => {
  console.log('in getAllWorkouts')
  PremadeWorkout.find( {} )
    .exec()
    .then( ( workout ) => {
      console.log("workouts: "+ workout)
      res.render( 'createIntervalWorkout', {
        workout: workout
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

exports.saveExercise = ( req, res ) => {
  console.log("in saveExercise!")
  //console.dir(req)
  let newExercise = new Exercise( {
   exerciseName : req.body.exerciseName,
   timer : req.body.timer,
   rec : req.body.rec,
   order : req.body.order
  } )

  //console.log("posts = "newPost)

  newExercise.save()
    .then( () => {
      res.redirect( '/exerciseForm' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteWorkout = (req, res) => {
  console.log("in deleteWorkout")
  let workoutName = req.body.workoutName
  if (typeof(workoutName)=='string') {
      PremadeWorkout.deleteOne({_id:workoutName})
           .exec()
           .then(()=>{res.redirect('/createIntervalWorkout')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(workoutName)=='object'){
      PremadeWorkout.deleteMany({_id:{$in:workoutName}})
           .exec()
           .then(()=>{res.redirect('/createIntervalWorkout')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(workoutName)=='undefined'){
      console.log("This is if they didn't select a post")
      res.redirect('/createIntervalWorkout')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown workoutName: ${workoutName}`)
   }
};
 exports.selectWorkout = (req, res) => {
   console.log("in selectWorkout")
   let workoutName = req.body.workoutName
   PremadeWorkout.findOne({_id:workoutName})
              .exec()
              .then( ( workout ) => {
                console.log("workouts: "+ workout)
                res.render( 'createIntervalWorkout', {
                  w: workout
                } );
              } )
              .catch( ( error ) => {
                console.log( error.message );
                return [];
              } )
              .then( () => {
                console.log( 'RepWorkout promise complete' );
              } );

 }
