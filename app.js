var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
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

const workoutController = require('./controllers/workoutController');
const exerciseController = require('./controllers/exerciseController');
const workoutSequenceController = require('./controllers/workoutSequenceController');


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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'zzbbyanana'}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

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
//app.post('/deleteWorkout', filterController.deleteWorkout)
//app.post('/selectWorkout', filterController.selectWorkout)


app.get('/workoutForm',  workoutController.renderWorkoutForm)
app.get('/exerciseForm',  exerciseController.renderExerciseForm)
app.post('/saveWorkout2', workoutController.saveWorkout2)
app.post('/saveExercise', exerciseController.saveExercise)
app.get('/workoutSequence',
  exerciseController.attachExercise,
  workoutController.attachWorkout,
  (req, res) => {
  //res.locals.workouts = [{name:"fb"},{name:"yoga"}]
  //res.locals.exercises = [{name:"pushups"},{name:"down dog"}]
  res.render('workoutSequence')
} );
app.post('/saveWorkoutSequence', workoutSequenceController.saveWorkoutSequence)
//app.get('/admin', filterController.renderAdmin);
app.get('/admin', filterController.getAllWorkouts);
app.post('/deleteWorkout', filterController.deleteWorkout);


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
