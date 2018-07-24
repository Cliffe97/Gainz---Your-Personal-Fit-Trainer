var express = require('express')
var bodyParser = require('body-parser')
var util = require("util")
var csv = require("csv")
var app = express();
var obj = csv();

app.use(bodyParser.json());

var server = app.listen(8081, function(){
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
var name = [];
var focus = [];
var workoutArray=[];
var timerArray=[];
var recArray=[];
var selectedName = [];
var selectedWorkout = [];
var selectedTimer = [];
var selectedRec = [];
var workoutCount = [];
var runningWorkout = [];
//var arrayIndex;

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
function updateArray(){
  for(i=0;i<100;i++){
    workoutArray[i] = [];
    timerArray[i]= [];
    recArray[i]= [];
  }
}

function get_count(category){
  count = 0;
  var workout_category;
  console.log("category: "+ category);
  console.log("Mydata.length: "+ MyData.length);
  updateArray();
  for(var index = 1; index < MyData.length; index ++){
    console.log(MyData[index]["category"])
    console.log("comparing the statement")
    console.log(category)
    if(category == MyData[index]["category"]){
      console.log((count+1)+" result found");
      name[count]=MyData[index]["name"];
      focus[count]=MyData[index]["category"];
      workoutArray[count][0] = MyData[index]["workout1"]
      workoutArray[count][1] = MyData[index]["workout2"]
      workoutArray[count][2] = MyData[index]["workout3"]
      workoutArray[count][3] = MyData[index]["workout4"]
      workoutArray[count][4] = MyData[index]["workout5"]
      workoutArray[count][5] = MyData[index]["workout6"]
      workoutArray[count][6] = MyData[index]["workout7"]
      timerArray[count][0] = MyData[index]["timer1"]
      timerArray[count][1] = MyData[index]["timer2"]
      timerArray[count][2] = MyData[index]["timer3"]
      timerArray[count][3] = MyData[index]["timer4"]
      timerArray[count][4] = MyData[index]["timer5"]
      timerArray[count][5] = MyData[index]["timer6"]
      timerArray[count][6] = MyData[index]["timer7"]
      recArray[count][0] = MyData[index]["rec1"]
      recArray[count][1] = MyData[index]["rec2"]
      recArray[count][2] = MyData[index]["rec3"]
      recArray[count][3] = MyData[index]["rec4"]
      recArray[count][4] = MyData[index]["rec5"]
      recArray[count][5] = MyData[index]["rec6"]
      recArray[count][6] = MyData[index]["rec7"]
      count ++;
    }
  }
  return count;
}
function terminate(){
  selectedName = [];
  selectedWorkout = [];
  selectedTimer = [];
  selectedRec = [];
}
function process_request(req, res, next){
  res.locals.output_string = "there was an error";
  var temp = "";
  console.log("in the processing")

  if(req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/0c2900e5-d161-43b5-b96e-a7433219dc64"){
    console.log("how many triggered");
    var category = req.body.queryResult.parameters["BodyFocus"];
    var result = get_count(category);
    res.locals.output_string = "There are"+result;
  }else if(req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/60133197-d766-41f3-ba9c-53c6ffbf9123"){
    var arrayIndex = req.body.queryResult.parameters["number-integer"];
    var workoutName = name[arrayIndex-1];
    console.log(workoutName)
    console.log(name[arrayIndex])
    res.locals.output_string = "This is "+workoutName+".";
  }else if(req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/52ad23d1-a4d8-49d1-9c83-54e66ca6bdd4"){
    console.log(arrayIndex)
    selectedName[0] = name[arrayIndex]
    console.log(selectedName[0])
    console.log(name[arrayIndex])
    selectedName[0] = name[arrayIndex-1]
    selectedWorkout[0] = workoutArray[arrayIndex-1][0]
    selectedWorkout[1] = workoutArray[arrayIndex-1][1]
    selectedWorkout[2] = workoutArray[arrayIndex-1][2]
    selectedWorkout[3] = workoutArray[arrayIndex-1][3]
    selectedWorkout[4] = workoutArray[arrayIndex-1][4]
    selectedWorkout[5] = workoutArray[arrayIndex-1][5]
    selectedWorkout[6] = workoutArray[arrayIndex-1][0]
    selectedTimer[0] = timerArray[arrayIndex-1][0]
    selectedTimer[1] = timerArray[arrayIndex-1][1]
    selectedTimer[2] = timerArray[arrayIndex-1][2]
    selectedTimer[3] = timerArray[arrayIndex-1][3]
    selectedTimer[4] = timerArray[arrayIndex-1][4]
    selectedTimer[5] = timerArray[arrayIndex-1][5]
    selectedTimer[6] = timerArray[arrayIndex-1][6]
    selectedRec [0] = recArray[arrayIndex-1][0]
    selectedRec [1] = recArray[arrayIndex-1][0]
    selectedRec [2] = recArray[arrayIndex-1][0]
    selectedRec [3] = recArray[arrayIndex-1][0]
    selectedRec [4] = recArray[arrayIndex-1][0]
    selectedRec [5] = recArray[arrayIndex-1][0]
    selectedRec [6] = recArray[arrayIndex-1][0]
  }else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/afdd2389-1dd0-4b95-9feb-d031e59e1912"){
    console.log("in the start intent")
    //setting workoutCount resets the counter for the remainder of the workout
    workoutCount[0] = 0;
    runningWorkout[0] = 1; //1 meaning true there is a workout running and 0 meaning no workout running

    //the next 22 lines are just to fill in a sample results array
    console.log(selectedWorkout)
    console.log(selectedTimer)
    console.log(selectedRec)
    if ( selectedTimer[0] == "0"){
      //first exercise is rep exercise
      res.locals.output_string = "Starting " + selectedName[0] + ". First exercise is " + selectedWorkout[0] + ". Your target goal is " + selectedRec[0] + ".";
    } else {
      //first exercise is interval exercise
      res.locals.output_string = "Starting " + selectedName[0] + ". First exercise is " + selectedWorkout[0] + " for " + selectedTimer[0] + ". Your target goal is " + selectedRec[0] + ".";
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
        res.locals.output_string = "Next exercise is " + selectedWorkout[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      } else {
        //exercise is interval exercise
        res.locals.output_string = "Next exercise is " + selectedWorkout[workoutCount[0]] + " for " + selectedTimer[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      }
    } else {
      //write a function to clear the current running workout like clear selectedWorkout[] + others
      //Add a statement which checks if the user is running a workout or not/ for example so if they terminate they can go back and say next, it would say no running workout.
      terminate();
      if (runningWorkout[0] == 1){
        res.locals.output_string = "You have completed all the workouts. Nice job!";
        runningWorkout[0] = 0;
      } else {
        res.locals.output_string = "You are not running a workout currently";
      }
    }

  //This will be the terminating intent
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/f36dbef4-b860-40dc-bcd0-2b85d1f54b51") {
    if (runningWorkout[0] == 1){
      terminate();
      res.locals.output_string = "Terminating Workout. Nice job!";
      runningWorkout[0] = 0;
    } else {
      res.locals.output_string = "You are not running a workout currently";
    }

  //This will be the pause intent
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/6936c56b-8b8a-4bd6-9bf9-ddad6b927578") {
    if (runningWorkout[0] == 1){
      res.locals.output_string = "Pausing Workout";
    } else {
      res.locals.output_string = "You are not running a workout currently";
    }

  //This will be the resume intent
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/0b02bbd9-f02c-45ad-8742-306a6ba8c72e") {
    if (runningWorkout[0] == 1){
      if ( selectedTimer[workoutCount[0]] == "0"){
        //exercise is rep exercise
        res.locals.output_string = "Resuming workout. Current Exercise is " + selectedWorkout[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      } else {
        //exercise is interval exercise
        res.locals.output_string = "Resuming workout. Current Exercise is " + selectedWorkout[workoutCount[0]] + " for " + selectedTimer[workoutCount[0]] + ". Your target goal is " + selectedRec[workoutCount[0]] + ".";
      }
    } else {
      res.locals.output_string = "You are not running a workout currently";
    }

  } else {
    res.locals.output_string = "oh no!";
  }

  return res.json({
      "fulfillmentMessages": [],
      "fulfillmentText": res.locals.output_string,
      "payload":{"slack":{"text":res.locals.output_string}},
      "outputContexts": [],
      "source": "Text Source",
      "followupEventInput":{}
    });
};

app.post('/hook', function(req, res){
  //  console.log(req)
  console.dir(req);
  console.log(JSON.stringify(req.body, null, 2));
    process_request(req, res)
})
