// all express modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
// const rateLimit = require("express-rate-limit");

// create express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// production env
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(helmet());

  app.use('/public', express.static(path.join(__dirname, 'public'), { maxAge: '1y', etag: true }));
} else {
  // static public folder
  app.use('/public', express.static(path.join(__dirname, 'public')));
}

// use morgan 'dev' type for log
app.use(logger('dev'));
// use json for express body
app.use(express.json());
// url encode
app.use(express.urlencoded({ extended: false }));
// cookie parse
app.use(cookieParser());

// page routers
const indexRouter = require('./routes/index');
const wikiRouter = require('./routes/wiki');
const catalogRouter = require('./routes/catalog');
app.use('/', indexRouter);
app.use('/wiki', wikiRouter);
app.use('/catalog', catalogRouter);

// db
const mongoDB = 'mongodb://express:123456@1Panel-mongodb-60sn:27017/express_db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, '[error][db]:'));

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
