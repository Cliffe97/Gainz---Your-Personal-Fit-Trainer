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
function MyCSV(WORKOUT1, TIMER1, REC1,	WORKOUT2,	TIMER2, REC2, WORKOUT3,	TIMER3,	REC3,	WORKOUT4, TIMER4,	REC4,	WORKOUT5,	TIMER5,	REC5, WORKOUT6, TIMER6, REC6, WORKOUT7, TIMER7, REC7){
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

obj.from.path('Workout.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2],
         data[index][3], data[index][4], data[index][5], data[index][6], data[index][7],
          data[index][8], data[index][9], data[index][10], data[index][11], data[index][12],
           data[index][13], data[index][14], data[index][15], data[index][16], data[index][17],
           data[index][18], data[index][19], data[index][20], data[index][21]))
    }
    console.log(MyData); //display the data in the console
    //console.log(newList1);
    //console.log(newList2);
    //console.log(newList3);
    //console.log(constrains)
});

function process_request(req, res){
  var output_string = "there was an error";
  var temp = "";
  console.log("in the processing")

  if (req.body.queryResult.intent.name == "projects/newagent-2d1f9/agent/intents/97790d1d-312f-4c72-8ef1-d71861981704"){
    output_string = "testing the backend";
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
