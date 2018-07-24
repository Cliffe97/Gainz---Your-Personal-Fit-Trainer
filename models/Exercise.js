'use strict';
const mongoose = require( 'mongoose' );

var exerciseSchema = mongoose.Schema( {
  exerciseName: String,
  timer: String,
  rec: String,
  order: String
} );



module.exports = mongoose.model( 'exercise', exerciseSchema );
