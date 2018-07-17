'use strict';
const mongoose = require( 'mongoose' );

var workoutSchema = mongoose.Schema( {
  Name: String,
  Timer: String,
  Rec: String,
  Category: String
} );



module.exports = mongoose.model( 'PremadeWorkout', workoutSchema );
