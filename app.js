const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
mongoose.Promise = require('bluebird');

const loginSignupRouter = require('./routes/loginSignup');
const todoRouter = require('./routes/todo');

var session = require("express-session")({
    secret: 'todo!@$%()$#)@',
    resave: true,
    saveUninitialized: true
});

const app = express();

app.use(flash());

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./config/connection')(mongoose);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginSignupRouter);
app.use('/todo', todoRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
