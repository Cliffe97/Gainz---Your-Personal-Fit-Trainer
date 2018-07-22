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

function get_count(category){
  count = 0;
  var workout_category;
  console.log("category: "+ category);
  console.log(MyData.length);
  for(var index = 0; index < MyData.length; index ++){
    if(category = MyData[index]["category"]){
      console.log((count+1)+"result found");
      selectedName[0] = MyData[index]["name"]
      selectedWorkout[0] = MyData[index]["workout1"]
      selectedWorkout[1] = MyData[index]["workout2"]
      selectedWorkout[2] = MyData[index]["workout3"]
      selectedWorkout[3] = MyData[index]["workout4"]
      selectedWorkout[4] = MyData[index]["workout5"]
      selectedWorkout[5] = MyData[index]["workout6"]
      selectedWorkout[6] = MyData[index]["workout7"]
      selectedTimer[0] = MyData[index]["timer1"]
      selectedTimer[1] = MyData[index]["timer2"]
      selectedTimer[2] = MyData[index]["timer3"]
      selectedTimer[3] = MyData[index]["timer4"]
      selectedTimer[4] = MyData[index]["timer5"]
      selectedTimer[5] = MyData[index]["timer6"]
      selectedTimer[6] = MyData[index]["timer7"]
      selectedRec [0] = MyData[index]["rec1"]
      selectedRec [1] = MyData[index]["rec2"]
      selectedRec [2] = MyData[index]["rec3"]
      selectedRec [3] = MyData[index]["rec4"]
      selectedRec [4] = MyData[index]["rec5"]
      selectedRec [5] = MyData[index]["rec6"]
      selectedRec [6] = MyData[index]["rec7"]
      count ++;
    }
  }
  return count;
}

function process_request(req, res){
  var output_string = "there was an error";
  var temp = "";
  console.log("in the processing")

  if(req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/0c2900e5-d161-43b5-b96e-a7433219dc64"){
    console.log("how many triggered");
    var category = req.body.queryResult.parameters["BodyFocus"];
    var result = get_count(category);
    output_string = "There are"+result;
  } else if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/afdd2389-1dd0-4b95-9feb-d031e59e1912"){
    console.log("in the start intent")
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
      console.log("COMPAR")
    } else {
      console.log("Stringggggg")

    }
    output_string = "Starting " + selectedName[0] + ". First exercise is " + selectedWorkout[0];
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
  //  console.log(req)
  //  console.log(JSON.stringify(req.body, null, 2));
    process_request(req, res)
})
