'use strict'
const PremadeWorkout = require( '../models/PremadeWorkout' );
console.log("loading the filter Controller")

// exports.renderMain =  (req,res) => {
//   //console.log("in the swController.renderMain")
//   res.render('repWorkout')
// }

exports.getAllWorkouts = ( req, res ) => {
  console.log('in getAllWorkouts')
  PremadeWorkout.find( {} )
    .exec()
    .then( ( workout ) => {
      console.log("workouts: "+ workout)
      res.render( 'admin', {
        workout: workout
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'RepWorkout promise complete' );
    } );
};

exports.saveWorkout = ( req, res ) => {
  console.log("in saveWorkout!")
  //console.dir(req)
  let newWorkout = new PremadeWorkout( {
    Name: req.body.Name,
    Email: user.googleemail,
    Exercise1: req.body.Exercise1,
    Timer1: req.body.Timer1,
    Rec1: req.body.Rec1,
    Category1:req.body.Category1,
    Exercise2: req.body.Exercise2,
    Timer2: req.body.Timer2,
    Rec2: req.body.Rec2,
    Category2:req.body.Category2,
    Exercise1: req.body.Exercise3,
    Timer1: req.body.Timer3,
    Rec1: req.body.Rec3,
    Category1:req.body.Category3
  } )

  //console.log("posts = "newPost)

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
