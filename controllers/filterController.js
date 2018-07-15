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

exports.getAllWorkouts = ( req, res ) => {
  console.log('getting all the workouts');
  PremadeWorkout.find( {} )
    .exec()
    .then( (workout) => {
      console.log("sending results")
      console.log("workouts: " + workout)
      res.render( 'admin', {
        workout: workout
         });
      })
    .catch( ( error ) => {
      console.log( error.message );
      return [];
      } )
    .then( () => {
      console.log( 'post promise complete' );
    } );
};

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


exports.deleteWorkout = (req, res) => {
  console.log("in deleteWorkout")
  let workoutName = req.body.workoutName
  if (typeof(workoutName)=='string') {
      PremadeWorkout.deleteOne({_id:workoutName})
           .exec()
           .then(()=>{res.redirect('/admin')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(workoutName)=='object'){
      PremadeWorkout.deleteMany({_id:{$in:workoutName}})
           .exec()
           .then(()=>{res.redirect('/admin')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(workoutName)=='undefined'){
      console.log("This is if they didn't select a post")
      res.redirect('/admin')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown workoutName: ${workoutName}`)
  }
};


exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('admin')
}
