'use strict';
const mongoose = require( 'mongoose' );

var newWorkoutSchema = mongoose.Schema( {
  name: String,
  category: String
} );



module.exports = mongoose.model( 'Workout', newWorkoutSchema );
