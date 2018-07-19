'use strict';
const mongoose = require( 'mongoose' );

var workoutSchema = mongoose.Schema( {
  Name: String,
  Email: String,
  Category: String,
  Exercise1: String,
  Timer1: String,
  Rec1: String,
  Exercise2: String,
  Timer2: String,
  Rec2: String,
  Exercise3: String,
  Timer3: String,
  Rec3: String,
  Exercise4: String,
  Timer4: String,
  Rec4: String,
  Exercise5: String,
  Timer5: String,
  Rec5: String,
  Exercise6: String,
  Timer6: String,
  Rec6: String,
  Exercise7: String,
  Timer7: String,
  Rec7: String,
} );



module.exports = mongoose.model( 'PremadeWorkout', workoutSchema );
