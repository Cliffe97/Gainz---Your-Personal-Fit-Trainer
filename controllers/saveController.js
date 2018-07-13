'use strict';
const PremadeWorkout = require( '../models/PremadeWorkout' );
console.log("loading the filter Controller");
// var constraints = [];
// var results = [];
//
// function newConstrainst(){
//   constraints = [];
// }
//
// function newResults(){
//   for (i=0;i<50;i++){
//     results[i] = [];
//   }
// }

exports.saveWorkout = ( req, res ) => {
  console.log("in saveWorkout!")
  //console.dir(req)
  let newWorkout = new PremadeWorkout( {
    Name: req.body.Name,
    Maker: req.body.Maker,
    Duration: req.body.Duration,
    Difficulty: req.body.Difficulty
  } )

  //console.log("posts = "+newPost)

  newWorkout.save()
    .then( () => {
      res.redirect( '/admin' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('category')
}
