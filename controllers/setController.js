'use strict'
const PremadeWorkout = require( '../models/PremadeWorkout' );
const Plan = require('../models/Plan');
console.log("loading the set Controller")

var async = require('async');

// exports.renderMain =  (req,res) => {
//   //console.log("in the swController.renderMain")
//   res.render('repWorkout')
// }

exports.getAllPlans= ( req, res ) => {
  console.log('in getAllWorkouts')
  Plan.find( {} )
    .exec()
    .then( ( plan ) => {
      console.log("plans: "+ plan)
      res.render( 'preMade', {
        plan: plan
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

exports.savePlan = ( req, res ) => {
  const function_list = [];
  const workout_id_list = [];

  console.log(req.body);

  //create a list of workouts
  //which comes from req.body
  //const workout_list = [];
  //each document in this list looks like this
  /*
  const workout_obj = {
   Name: <>,
   Timer,
   Rec,
   Category
  }

  workout_list.push(workout_obj)
  */
  const workout_obj = {
    Name: req.body.Name,
    Timer: req.body.Timer,
    Rec: req.body.Rec,
    Category: req.body.Category
  }

  const workout_list = {
    
  }
  workout_list.push(workout_obj);
  //save workouts
  for(let workout of workout_list){
    function_list.push(function(callback){
      const new_workout = new PremadeWorkout(workout);
      //check exists
      PremadeWorkout.findOne(workout, function(err, doc){
        if(err){
          callback(err, null);
        } else {
          if(doc){
            workout_id_list.push(doc._id)
            callback(null);
          } else {
            new_workout.save(function(err, doc){
              if(err){
                callback(err, null);
              } else {
                workout_id_list.push(doc._id);
              }
            });
          }
        }
      })
    })
  }

  //save plan
  function_list.push(function(callback){
    const new_plan = new Plan({
      set: workout_id_list
    })
    new_plan.save(callback);
  })

  async.series(function_list, function(err, results){
    if(err){
      next(err);
    } else {
      res.redirect('/preMade');
    }
  })
};

exports.deleteWorkout = (req, res) => {
  console.log("in deleteWorkout")
  let workoutName = req.body.workoutName
  if (typeof(workoutName)=='string') {
      PremadeWorkout.deleteOne({_id:workoutName})
           .exec()
           .then(()=>{res.redirect('/admin')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(workoutName)=='object'){
      PremadeWorkout.deleteMany({_id:{$in:workoutName}})
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
