var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var util = require("util")
const flash = require('connect-flash')
const bodyParser = require("body-parser")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const createIntervalWorkoutController = require('./controllers/createIntervalWorkoutController')
const createRepWorkoutController = require('./controllers/createRepWorkoutController')
const repWorkoutController = require('./controllers/repWorkoutController')
const intervalWorkoutController = require('./controllers/intervalWorkoutController')
const customChoosingController = require('./controllers/customChoosingController')

const menuController = require('./controllers/menuController');
const filterController = require('./controllers/filterController');
const setController = require('./controllers/setController');
const aboutController = require('./controllers/aboutController')
const preMadeController = require('./controllers/preMadeController')
const Workout = require( './models/Workout' );
const Exercise = require( './models/Exercise' );
const WorkoutSequence = require( './models/WorkoutSequence' );

//authentication with passport
const session = require("express-session")
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)

const mongoose = require( 'mongoose' );
//mongoose.connect( 'mongodb://localhost/gainz' );
mongoose.connect( 'mongodb://gainz:Brandeis18@ds145121.mlab.com:45121/gainz-google' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'zzbbyanana'}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())



app.use((req,res,next)=>{
  res.locals.loggedIn=false
  if (req.isAuthenticated()) {
    console.log("user has been authenticated")
    res.locals.user=req.user
    res.locals.loggedIn=true
    if (req.user) {
      if (req.user.googleemail=='gavinyhan@gmail.com' || req.user.googleemail=='mkleung@brandeis.edu' || req.user.googleemail=='cliffe14@brandeis.edu' || req.user.googleemail=='humangainz@gmail.edu') {
        console.log("owner has logged in")
        res.locals.status='owner'
      } else {
        console.log('user has logged in')
        res.locals.status = 'user'
      }
    }
  }
  next()
})

//authentification routes
app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

//logging out
app.get('/logout',function(req,res){
  req.logout()
  res.redirect('/')
})



app.get('/auth/google',
  passport.authenticate('google',{scope:['profile','email']}));

  app.get('/login/google/callback',
    passport.authenticate('google', {
      successRedirect:'/',
      failureRedirect:'/loginerror'
    }))

app.get('/login/authorized',
  passport.authenticate('google', {
    successRedirect:'/',
    failureRedirect:'/loginerror'
  }))

app.get('/createIntervalWorkout',  filterController.getAllWorkouts)
//app.post('/saveWorkout', filterController.saveWorkout)
//app.get('/preMade', setController.getAllPlans)
//app.get('/c'ategory', filterController.getAllWorkouts)
app.post('/deleteWorkout', filterController.deleteWorkout)
//app.post('/selectWorkout', filterController.selectWorkout)


//route middleware to make sure a user is logged inspect
function isLoggedIn(req,res,next){
  console.log("checking to see if they are authenticated")
    //if user is authenticated in the session, carry on
    res.locals.loggedIn = false
    if (req.isAuthenticated()) {
      console.log("user has been authenticated")
      req.locals.loggedIn = true
      return next();
    } else {
      console.log("user has not been authenticated")
      res.redirect('/login')
    }
}


//we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile',{
    user:req.user
  })
})


app.use((req,res,next)=>{
  console.log("res.locals=")
  console.dir(res.locals)
  next()
})




app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.get('/createIntervalWorkout',
          //  createIntervalWorkoutController.renderMain)
app.get('/createRepWorkout',
            createRepWorkoutController.renderMain)
app.get('/menu',
            menuController.attachFilms,
            menuController.renderMain)
app.get('/about',
            aboutController.renderMain)
// app.get('/preMade',
//             preMadeController.renderMain)
app.get('/customChoosing',
            customChoosingController.renderMain)




app.get('/intervalWorkout',
            intervalWorkoutController.renderMain)
            //intervalWorkoutController.getAllIntervalWorkout)
app.get('/repWorkout',
            repWorkoutController.renderMain)
            //repWorkoutController.getAllRepWorkout)


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

let sessionVars=[];
function process_request(req, res, next){
  res.locals.output_string = "there was an error";
  var temp = "";
  console.log("in the processing")
  sessionVars[req.body.sessions]= sessionVars[req.body.sessions] || {};
  let sessionVar = sessionVars[req.body.sessions];
  if(req.body.queryResult.intent.displayName == "how_many"){
    console.log("how many triggered");
    var category = req.body.queryResult.parameters["BodyFocus"];
    sessionVar.category = category;
    count_workouts(sessionVar,req,res, next);
  }else if(req.body.queryResult.intent.displayName == "show_one"){
    var arrayIndex = req.body.queryResult.parameters["number-integer"];

    get_one(sessionVar, arrayIndex, req, res, next);
  }else if (req.body.queryResult.intent.displayName == "Workout - Start command"){
    console.log("in the start intent")
    sessionVar.step = -1;
    sessionVar.status = 1;
    sessionVar.step++
    doWorkout(sessionVar,req,res,next);
  //This is the next exercise intent
} else if(req.body.queryResult.intent.displayName == "Next exercise") {
    console.log("in the next intent");
    console.dir(sessionVar)
    if(sessionVar.status == 1){
      sessionVar.step++
      doWorkout(sessionVar,req,res,next);
    }else{
      res.locals.output_string = "You are not in any workout right now."
      next();
    }
  } else if(req.body.queryResult.intent.displayName == "Do_Again"){
    sessionVar.status = 1;
    sessionVar.step = -1;
    sessionVar.step++
    doWorkout(sessionVar,req,res,next);
  }else if(req.body.queryResult.intent.displayName == "Terminate Workout"){
    res.locals.output_string = "Terminating workout."
    sessionVar.status = 0;
    console.log("after terminate");
    next();
  }else if(req.body.queryResult.intent.displayName == "Pause Workout"){
    if(sessionVar.status==1){
      res.locals.output_string = "Pausing workout."
      console.log("after pause");
      next();
    }else{
      res.locals.output_string = "You are not in any workout right now."
      next();
    }
  }else if(req.body.queryResult.intent.displayName == "Resume Workout"){
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


function replyToDiaf(req, res, next){
  console.dir(req.body)
  return res.json({
      "fulfillmentMessages": [],
      "fulfillmentText": res.locals.output_string,
      "payload":{"slack":{"text":res.locals.output_string}},
      "outputContexts": [],
      "source": "Text Source",
      "followupEventInput":{}
    });

}

app.post('/hook', process_request, replyToDiaf);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
