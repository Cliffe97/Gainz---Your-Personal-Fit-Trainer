'use strict';
const mongoose = require( 'mongoose' );

var addRepWorkoutSchema = mongoose.Schema( {
  workoutName: String,
  repetitions: String,
  setsAndRounds: String
} );

module.exports = mongoose.model( 'createRepWorkout', addRepWorkoutSchema );
