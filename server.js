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
function MyCSV(STREET_ADDRESS, LISTING_REGION, LISTING_COMMUNITY,	LISTING_CITY,	POSTAL_CODE, LATITUDE, LONGITUDE,	MANAGED_BY,	MAIN_PHOTO,	PROPERTY_TYPE, PRICE,	BEDS,	BATHS,	SQ_FT,	PETS){
  this.street_address = STREET_ADDRESS
  this.price = PRICE
  this.beds = BEDS
  this.baths = BATHS
  this.sq_ft = SQ_FT
  //this.listing_city = LISTING_CITY
}

var MyData = [];

obj.from.path('Workout.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
        MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2],
         data[index][3], data[index][4], data[index][5], data[index][6], data[index][7],
          data[index][8], data[index][9], data[index][10], data[index][11], data[index][12],
           data[index][13], data[index][14], data[index[15]]))
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
