'use strict';
const mongoose = require( 'mongoose ' );

var workoutSchema = mongoose.Schema( {
  Name: String,
  Maker: String,
  Duration: String,
  Difficulty: String,
  BodyFocus: String,
  TrainingType: String,
  Equipment: String,
  Content: String,
  Timing, String
} );

module.exports = mongoose.model( 'PremmadeWorkout', workoutSchema );
