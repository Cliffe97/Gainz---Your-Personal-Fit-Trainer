'use strict';
const mongoose = require( 'mongoose' );

var addIntervalWorkoutSchema = mongoose.Schema( {
  workoutName: String,
  timeDuration: String
} );

module.exports = mongoose.model( 'createIntervalWorkout', addIntervalWorkoutSchema );
