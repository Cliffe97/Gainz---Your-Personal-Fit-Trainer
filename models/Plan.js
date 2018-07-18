'use strict';
const mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var planSchema = mongoose.Schema( {
  set: {
    type: [Schema.ObjectId],
    ref: 'premadeworkout',
    required: true
  }
  //other fields for plan
} );



module.exports = mongoose.model( 'plan', planSchema );
