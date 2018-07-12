'use strict';
const PremmadeWorkout = require( '../models/PremmadeWorkout' );
console.log("loading the filter Controller");
var constraints = [];
var results = [];

function newConstrainst(){
  constraints = [];
}

function newResults(){
  for (i=0;i<50;i++){
    results[i] = [];
  }
}

exports.searchedWorkouts = ( req, res ) => {
  console.log('searching for workouts');
  PremmadeWorkout.find( {Duration: constraints[0]}, {Difficulty: constraints[1]},
                        {BodyFocus: constraints[2]}, {TrainingType: constraints[3]},
                        {Equipment: constaints[4]})
                 .exec()
                 .then( (results) => {
                   console.log("sending results")
                 })
}
