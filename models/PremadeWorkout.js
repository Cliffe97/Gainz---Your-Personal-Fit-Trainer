'use strict';
const mongoose = require( 'mongoose' );

var workoutSchema = mongoose.Schema( {
  Name: String,
  Email: String,
  Exercise1: String,
  Timer1: String,
  Rec1: String,
  Category1: String,
  Exercise2: String,
  Timer2: String,
  Rec3: String,
  Category3: String,
  Exercise3: String,
  Timer3: String,
  Rec3: String,
  Category3: String
} );



module.exports = mongoose.model( 'PremadeWorkout', workoutSchema );
