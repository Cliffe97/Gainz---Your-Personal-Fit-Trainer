var express = require('express')
var bodyParser = require('body-parser')
var util = require("util")
var csv = require("csv")
var service = express();
var obj = csv();

service.use(bodyParser.json());

var server = service.listen(8081, function(){
console.log('API server listening...')
})
function MyCSV(NAME,CATEGORY,WORKOUT1, TIMER1, REC1,	WORKOUT2,	TIMER2, REC2, WORKOUT3,	TIMER3,	REC3,	WORKOUT4, TIMER4,	REC4,	WORKOUT5,	TIMER5,	REC5, WORKOUT6, TIMER6, REC6, WORKOUT7, TIMER7, REC7){
  this.name = NAME
  this.category = CATEGORY
  this.workout1 = WORKOUT1
  this.timer1 = TIMER1
  this.rec1 = REC1
  this.workout2 = WORKOUT2
  this.timer2 = TIMER2
  this.rec2 = REC2
  this.workout3 = WORKOUT3
  this.timer3 = TIMER3
  this.rec3 = REC3
  this.workout4 = WORKOUT4
  this.timer4 = TIMER4
  this.rec4 = REC4
  this.workout5 = WORKOUT5
  this.timer5 = TIMER5
  this.rec5 = REC5
  this.workout6 = WORKOUT6
  this.timer6 = TIMER6
  this.rec6 = REC6
  this.workout7 = WORKOUT7
  this.timer7 = TIMER7
  this.rec7 = REC7
}

var MyData = [];
var selectedName = [];
var selectedWorkout = [];
var selectedTimer = [];
var selectedRec = [];
var workoutCount = [];
var runningWorkout = []

obj.from.path('Workout.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2],
         data[index][3], data[index][4], data[index][5], data[index][6], data[index][7],
          data[index][8], data[index][9], data[index][10], data[index][11], data[index][12],
           data[index][13], data[index][14], data[index][15], data[index][16], data[index][17],
           data[index][18], data[index][19], data[index][20], data[index][21], data[index][22], data[index][23]))
    }
    console.log(MyData); //display the data in the console
    //console.log(newList1);
    //console.log(newList2);
    //console.log(newList3);
    //console.log(constrains)
});

function terminate(){
  selectedName = [];
  selectedWorkout = [];
  selectedTimer = [];
  selectedRec = [];
}

function process_request(req, res){
  var output_string = "there was an error";
  var temp = "";
  console.log("in the processing")

  if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/97790d1d-312f-4c72-8ef1-d71861981704"){
    output_string = "testing the backend";

  //This is the start workout intent
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/afdd2389-1dd0-4b95-9feb-d031e59e1912"){
    console.log("in the start intent")
    //setting workoutCount resets the counter for the remainder of the workout
    workoutCount[0] = 0;
    runningWorkout[0] = 1; //1 meaning true there is a workout running and 0 meaning no workout running

    //the next 22 lines are just to fill in a sample results array
    selectedName[0] = MyData[1]["name"]
    selectedWorkout[0] = MyData[1]["workout1"]
    selectedWorkout[1] = MyData[1]["workout2"]
    selectedWorkout[2] = MyData[1]["workout3"]
    selectedWorkout[3] = MyData[1]["workout4"]
    selectedWorkout[4] = MyData[1]["workout5"]
    selectedWorkout[5] = MyData[1]["workout6"]
    selectedWorkout[6] = MyData[1]["workout7"]
    selectedTimer[0] = MyData[1]["timer1"]
    selectedTimer[1] = MyData[1]["timer2"]
    selectedTimer[2] = MyData[1]["timer3"]
    selectedTimer[3] = MyData[1]["timer4"]
    selectedTimer[4] = MyData[1]["timer5"]
    selectedTimer[5] = MyData[1]["timer6"]
    selectedTimer[6] = MyData[1]["timer7"]
    selectedRec [0] = MyData[1]["rec1"]
    selectedRec [1] = MyData[1]["rec2"]
    selectedRec [2] = MyData[1]["rec3"]
    selectedRec [3] = MyData[1]["rec4"]
    selectedRec [4] = MyData[1]["rec5"]
    selectedRec [5] = MyData[1]["rec6"]
    selectedRec [6] = MyData[1]["rec7"]
    console.log(selectedWorkout)
    console.log(selectedTimer)
    console.log(selectedRec)
    if ( selectedTimer[0] == "0"){
      //first exercise is rep exercise
      output_string = "Starting " + selectedName[0] + ". First exercise is " + selectedWorkout[0] + ". Your target goal is " + selectedRec[0] + ".";
    } else {
      //first exercise is interval exercise
      output_string = "Starting " + selectedName[0] + ". First exercise is " + selectedWorkout[0] + " for " + selectedTimer[0] + ". Your target goal is " + selectedRec[0] + ".";
    }

  //This is the next exercise intent
  } else if(req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/64a22f46-bdee-4a1b-a8df-3956bdf6c158") {
    var tempCount = 0;
    tempCount = workoutCount[0];
    workoutCount[0] = tempCount + 1;
    //need to add another if statement to check if there is a new exercise or not
    //this if statement should check if the next workout is real or not and if it is real then it executes
    if (selectedWorkout[workoutCount[0]] != "" && runningWorkout[0] == 1){
      //rep vs interval if statement
      if ( selectedTimer[workoutCount[0]] == "0"){
        //exercise is rep exercise
        output_string = "Next exercise is " + selectedWorkout[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      } else {
        //exercise is interval exercise
        output_string = "Next exercise is " + selectedWorkout[workoutCount[0]] + " for " + selectedTimer[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      }
    } else {
      //write a function to clear the current running workout like clear selectedWorkout[] + others
      //Add a statement which checks if the user is running a workout or not/ for example so if they terminate they can go back and say next, it would say no running workout.
      terminate();
      if (runningWorkout[0] == 1){
        output_string = "You have completed all the workouts. Nice job!";
        runningWorkout[0] = 0;
      } else {
        output_string = "You are not running a workout currently";
      }
    }

  //This will be the terminating intent
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/f36dbef4-b860-40dc-bcd0-2b85d1f54b51") {
    if (runningWorkout[0] == 1){
      terminate();
      output_string = "Terminating Workout. Nice job!";
      runningWorkout[0] = 0;
    } else {
      output_string = "You are not running a workout currently";
    }

  //This will be the pause intent
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/6936c56b-8b8a-4bd6-9bf9-ddad6b927578") {
    if (runningWorkout[0] == 1){
      output_string = "Pausing Workout";
    } else {
      output_string = "You are not running a workout currently";
    }

  //This will be the resume intent
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/0b02bbd9-f02c-45ad-8742-306a6ba8c72e") {
    if (runningWorkout[0] == 1){
      if ( selectedTimer[workoutCount[0]] == "0"){
        //exercise is rep exercise
        output_string = "Resuming workout. Current Exercise is " + selectedWorkout[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      } else {
        //exercise is interval exercise
        output_string = "Resuming workout. Current Exercise is " + selectedWorkout[workoutCount[0]] + " for " + selectedTimer[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      }
    } else {
      output_string = "You are not running a workout currently";
    }

  } else {
    output_string = "oh no!";
  }

  return res.json({
      "fulfillmentMessages": [],
      "fulfillmentText": output_string,
      "payload":{"slack":{"text":output_string}},
      "outputContexts": [],
      "source": "Text Source",
      "followupEventInput":{}
    });
};

service.post('/hook', function(req, res){
    console.log(req)
    console.log(JSON.stringify(req.body, null, 2));
    process_request(req, res)
})
