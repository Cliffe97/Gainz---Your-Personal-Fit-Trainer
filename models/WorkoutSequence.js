'use strict';
const mongoose = require( 'mongoose' );

var workoutSequenceSchema = mongoose.Schema( {
  workoutName: String,
  exerciseName: String,
  order: Number
} );



module.exports = mongoose.model( 'workoutSequence', workoutSequenceSchema );
