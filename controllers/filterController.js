'use strict'
const WorkoutSequence = require( '../models/WorkoutSequence' );
const user = require('../models/user');
console.log("loading the filter Controller")

// exports.renderMain =  (req,res) => {
//   //console.log("in the swController.renderMain")
//   res.render('repWorkout')
// }

exports.renderAdmin = ( req, res ) => {
  res.render( 'admin');
};

exports.getAllWorkouts = ( req, res ) => {
  console.log('in getAllWorkouts')
  WorkoutSequence.find( {} )
    .exec()
    .then( ( workoutSequences ) => {
      console.log("WorkoutSequences: "+ workoutSequences)
      res.render( 'admin', {
        workoutSequences: workoutSequences
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

// exports.saveWorkout = ( req, res ) => {
//   console.log("in saveWorkout!")
//   //console.dir(req)
//   let newWorkout = new Workout( {
//     Name: req.body.Name,
//     Email: req.body.Email,
//     Category:req.body.Category,
//     Exercise1: req.body.Exercise1,
//     Timer1: req.body.Timer1,
//     Rec1: req.body.Rec1,
//     Exercise2: req.body.Exercise2,
//     Timer2: req.body.Timer2,
//     Rec2: req.body.Rec2,
//     Exercise3: req.body.Exercise3,
//     Timer3: req.body.Timer3,
//     Rec3: req.body.Rec3,
//     Exercise4: req.body.Exercise4,
//     Timer4: req.body.Timer4,
//     Rec4: req.body.Rec4,
//     Exercise5: req.body.Exercise5,
//     Timer5: req.body.Timer5,
//     Rec5: req.body.Rec5,
//     Exercise6: req.body.Exercise6,
//     Timer6: req.body.Timer6,
//     Rec6: req.body.Rec6,
//     Exercise7: req.body.Exercise7,
//     Timer7: req.body.Timer7,
//     Rec7: req.body.Rec7,
//   } )
//
//   //console.log("posts = "newPost)
//
//   newWorkout.save()
//     .then( () => {
//       res.redirect( '/createIntervalWorkout' );
//     } )
//     .catch( error => {
//       res.send( error );
//     } );
// };

exports.deleteWorkout = (req, res) => {
  console.log("in deleteWorkout")
  let workoutName = req.body.workoutName
  if (typeof(workoutName)=='string') {
      WorkoutSequence.deleteOne({_id:workoutName})
           .exec()
           .then(()=>{res.redirect('/admin')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(workoutName)=='object'){
      WorkoutSequence.deleteMany({_id:{$in:workoutName}})
           .exec()
           .then(()=>{res.redirect('/admin')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(workoutName)=='undefined'){
      console.log("This is if they didn't select a post")
      res.redirect('/admin')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown workoutName: ${workoutName}`)
   }
};
 // exports.selectWorkout = (req, res) => {
 //   console.log("in selectWorkout")
 //   let workoutName = req.body.workoutName
 //   Workout.findOne({_id:workoutName})
 //              .exec()
 //              .then( ( workout ) => {
 //                console.log("workouts: "+ workout)
 //                res.render( 'createIntervalWorkout', {
 //                  w: workout
 //                } );
 //              } )
 //              .catch( ( error ) => {
 //                console.log( error.message );
 //                return [];
 //              } )
 //              .then( () => {
 //                console.log( 'RepWorkoutSequence promise complete' );
 //              } );
 //
 // }
