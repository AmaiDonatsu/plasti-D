var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./loadEnviroment');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var signupRouter = require('./routes/auth/signup');
var loginRouter = require('./routes/auth/login');

var newOrganizationRouter = require('./routes/organizations/createOrganization');
var getOrganizationsRouter = require('./routes/organizations/getOrganizations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * App routes.
 */
  
app.use('/', indexRouter);
app.use('/users', usersRouter);
  // auth
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
  
  // work
app.use('/new_organization', newOrganizationRouter);
app.use('/get_organizations', getOrganizationsRouter);

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
