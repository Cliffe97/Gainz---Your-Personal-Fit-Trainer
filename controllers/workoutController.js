'use strict'
const Workout = require( '../models/Workout' );
const user = require('../models/user');
console.log("loading the workout Controller")

// exports.renderMain =  (req,res) => {
//   //console.log("in the swController.renderMain")
//   res.render('repWorkout')
// }

exports.renderWorkoutForm = ( req, res ) => {
  res.render( 'workoutForm');
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

exports.saveWorkout2 = ( req, res ) => {
  console.log("in saveWorkout2!")
  //console.dir(req)
  let newWorkout2 = new Workout( {
    name: req.body.name,
    category:req.body.category,
  } )

  //console.log("posts = "newPost)

  newWorkout2.save()
    .then( () => {
      res.redirect( '/workoutForm' );
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
