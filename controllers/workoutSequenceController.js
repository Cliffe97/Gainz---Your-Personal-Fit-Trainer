'use strict'
const Exercise = require( '../models/Exercise' );
const WorkoutSequence = require( '../models/WorkoutSequence' );
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

exports.saveWorkoutSequence = ( req, res ) => {
  console.log("in saveWorkoutSequence!")
  //console.dir(req)
  let newWorkoutSequence = new WorkoutSequence( {
   workoutName : req.body.workoutName,
   exerciseName : req.body.exerciseName,
   order : req.body.order
  } )

  console.log("newWorkoutSequence = "+ newWorkoutSequence)

  newWorkoutSequence.save()
    .then( () => {

      res.redirect( '/workoutSequence' );
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


 exports.attachExercise = ( req, res, next ) => {
  console.log('in attachExercise')
  Exercise.find( {} )
    .exec()
    .then( ( exercises ) => {
      res.locals.exercises = exercises
      next()
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'exercise promise complete' );
    } );
};
