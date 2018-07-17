'use strict';
const mongoose = require( 'mongoose' );

var planSchema = mongoose.Schema( {
  set: {
    type: [Schema.objectId],
    ref: 'premadeworkout',
    required: true
  }
  //other fields for plan
} );



module.exports = mongoose.model( 'plan', planSchema );
