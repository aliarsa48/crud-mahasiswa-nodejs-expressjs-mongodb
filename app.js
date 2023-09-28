var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import flash
const flash = require('connect-flash');

//import session
const session = require('express-session');

// mengimport mangoose
const mongoose = require("mongoose");

// mengimport method-override
const methodOverride = require("method-override");

// menghubungkan ke database
// mongoose.connect sebuah metode yang berfungsi untuk menghubungkan ke MongoDB
// db_mahasiswa sebagai nama dari database yang akan dibuat, penamaan ini bebeas, sesuai selera
// 27017 adalah lokal port default
// jika menggunakan angka 27017 gagal bisa menggunakan 127.0.0.1
// penjelasan ini saya dapatkan dari dokumentasi resminya

mongoose.connect("mongodb://127.0.0.1/db_mahasiswa");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mahasiswaRouter = require('./routes/mahasiswa');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// menggunakan method overrid
app.use(methodOverride("_method"));

// menggunakan session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 6000},
  })
);

// menggunakan flash
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mahasiswa', mahasiswaRouter);

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
