const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
mongoose.Promise = require('bluebird');
const compression = require('compression');
const helmet = require('helmet');
const loginSignupRouter = require('./routes/loginSignup');
const todoRouter = require('./routes/todo');

const session = require("express-session")({
    secret: 'todo!@$%()$#)@',
    resave: true,
    saveUninitialized: true
});

const app = express();

app.use(helmet());
app.use(compression());
app.use(flash());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./config/connection')(mongoose);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginSignupRouter);
app.use('/todo', todoRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
