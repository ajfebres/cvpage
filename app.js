var createError = require('http-errors');
var express = require('express');
var flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
var multer  = require('multer');
const uuidv4 = require('uuid/v4');
require('dotenv').config()


/// Routes

var indexRouter = require('./routes/index');
var projectRouter = require('./routes/projects');
var userRouter = require('./routes/users');


/// Initializations 
var app = express();
app.listen(process.env.PORT || 3000)
require('./config/mongodb');
require('./config/passport');
var storage = multer.diskStorage({
  destination: path.join(__dirname, '/storage'),
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'thisagreatmodule',
  resave:true,
  saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({storage}).array('images', 5));
app.use(flash());


/// Global Variables
app.use((req, res, next)=>{
  res.locals.user = req.user
  res.locals.error = req.flash('error');
  next();
})

app.use('/', indexRouter);
app.use('/projects', projectRouter);
app.use('/users', userRouter);

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
