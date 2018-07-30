var express = require('express')
var bodyParser = require('body-parser')
var util = require("util")
var app = express();
const Workout = require( './models/Workout' );
const Exercise = require( './models/Exercise' );
const WorkoutSequence = require( './models/WorkoutSequence' );


const mongoose = require( 'mongoose' );
//mongoose.connect( 'mongodb://localhost/gainz' );
mongoose.connect( 'mongodb://gainz:Brandeis18@ds145121.mlab.com:45121/gainz-google' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});
var arrayWorkout = [];


function count_workouts(session, req, res, next){
  Workout.find( {category:session.category} )
    .exec()
    .then( ( workouts ) => {
      console.log("The workouts: "+ workouts.length);
      // arrayWorkout.push(workouts);
      // console.log(arrayWorkout[0][0]);
      res.locals.output_string="There are "+ workouts.length;
      next();
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
}

  function get_one(sessionVar, index, req, res,next){
    // var name = arrayWorkout[0][index-1].name;
    // console.log(name);
    // return name;
    Workout.find( {category:sessionVar.category} )
      .exec()
      .then( ( workouts ) => {
        //console.log("The workouts: "+ workouts.length);
        // arrayWorkout.push(workouts);
        // console.log(arrayWorkout[0][0]);
        sessionVar.workout = workouts[index-1].name;
        sessionVar.step = -1;
        res.locals.output_string="The name is "+ workouts[index-1].name;
        next();
      } )
      .catch( ( error ) => {
        console.log( error.message );
        return [];
      } )

  }

  function doWorkout(sessionVar,req,res,next){
    console.log("in start workout")
    console.dir(sessionVar.workout)
    let exerciseName = "";
    WorkoutSequence.find({workoutName:sessionVar.workout})
      .exec()
      .then((exercises)=>{
        console.log("in WS.find")
        console.dir(exercises)
        if (sessionVar.step >= exercises.length){
          res.locals.output_string = "You have completed all the exercises in " + sessionVar.workout + ". Say do again to do the workout again.";
          sessionVar.step = -1;
          sessionVar.status = 0;
          next();
        } else {
          exerciseName = exercises[sessionVar.step].exerciseName
          console.log(exerciseName)
          Exercise.findOne({exerciseName: exerciseName})
          .exec()
          .then((exercise)=>{
            if(exercise.timer=="0"){
              res.locals.output_string = "Now do " + exercise.exerciseName + ". Target is " + exercise.rec+".";
              sessionVar.exercise = exercise;
              next();
            }else{
              res.locals.output_string = "Now do " + exercise.exerciseName + ". Target is " + exercise.rec + " for " + exercise.timer
              sessionVar.exercise = exercise;
              next();
            }
          })
          .catch((error)=>{
            console.log(error.message);
            res.locals.output_string = "There was an error #295";
            next();
          })
        }
      })
      .catch((error)=>{
        console.log(error.message);
        res.locals.output_string = "There was an error #2";
        next();
      })
  }


app.use(bodyParser.json());

var server = app.listen(8081, function(){
console.log('API server listening...')
})

let sessionVars=[];
function process_request(req, res, next){
  res.locals.output_string = "there was an error";
  var temp = "";
  console.log("in the processing")
  sessionVars[req.body.sessions]= sessionVars[req.body.sessions] || {};
  let sessionVar = sessionVars[req.body.sessions];
  if (req.body.request){
    if(req.body.request.intent == "how_many"){
      console.log("how many triggered");
      var category = req.body.request.slots.bodyfocusslot.value;
      sessionVar.category = category;
      count_workouts(sessionVar,req,res, next);
    }else if(req.body.request.intent == "show_one"){
      var arrayIndex = req.body.request.numberslot.value;
      get_one(sessionVar, arrayIndex, req, res, next);
    }else if (req.body.request.intent == "Workout - Start command"){
      console.log("in the start intent")
      sessionVar.step = -1;
      sessionVar.status = 1;
      sessionVar.step++
      doWorkout(sessionVar,req,res,next);
    //This is the next exercise intent
    } else if(req.body.request.intent == "Next exercise") {
        console.log("in the next intent");
        console.dir(sessionVar)
        if(sessionVar.status == 1){
          sessionVar.step++
          doWorkout(sessionVar,req,res,next);
        }else{
          res.locals.output_string = "You are not in any workout right now."
          next();
        }
      } else if(req.body.request.intent == "Do_Again"){
        sessionVar.status = 1;
        sessionVar.step = -1;
        sessionVar.step++
        doWorkout(sessionVar,req,res,next);
      }else if(req.body.request.intent == "Terminate Workout"){
        res.locals.output_string = "Terminating workout."
        sessionVar.status = 0;
        console.log("after terminate");
        next();
      }else if(req.body.request.intent == "Pause Workout"){
        if(sessionVar.status==1){
          res.locals.output_string = "Pausing workout."
          console.log("after pause");
          next();
        }else{
          res.locals.output_string = "You are not in any workout right now."
          next();
        }
      }else if(req.body.request.intent == "Resume Workout"){
        if(sessionVar.status==1){
          doWorkout(sessionVar,req,res,next);
        }else{
          res.locals.output_string = "You are not in any workout right now."
          next();
        }
      }else {
        res.locals.output_string = "oh no!";
        next();
      }
    };
  }


function replyToDiaf(req, res, next){
  console.dir(req.body)
  return res.json({
    "version": "beta",

    "sessionAttributes": {
      "key": "value"
    },
    "response": {
      "outputSpeech": {
        "type": "PlainText",
        "text": res.locals.output_string
      },
      "reprompt": {
        "outputSpeech": {
          "type": "PlainText",
          "text": "Plain text string to speak reprompt"
        }
      },
      "shouldEndSession": true
    }
  });
}




app.post('/hook', function (req, res) {
	console.log(JSON.stringify(req.body, null, 2)); //display the body of the response with objects expanded to json strings
	process_request(req, res),
  replyToDiaf(req, res, next)
	// var my_string = "string example";
	// return res.json({
 //                "fulfillmentMessages": [],
 //                "fulfillmentText": my_string,
 //                "payload": {},
 //                "outputContexts": [],
 //                "source": "Test Source",
 //                "followupEventInput": {}
 //            });

});
