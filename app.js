var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
//var logger = require('morgan');
//var port = process.env.PORT || 3000;
//app.set('port',port);


var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getManagerRouter = require('./routes/getManager');
var getEmployeesRouter = require('./routes/getEmployees');
var addRatingRouter = require('./routes/addRating');
var updateRatingRouter = require('./routes/updateRating');
var getEmployeeRatingRouter = require('./routes/getEmployeeRating');

//console.log("Inside app.js")

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use("/index", indexRouter);
app.use("/users", usersRouter);
app.use("/getManager", getManagerRouter);
app.use("/getEmployees",getEmployeesRouter);
app.use("/addRating",addRatingRouter);
app.use("/updateRating",updateRatingRouter);
app.use("/getEmployeeRating",getEmployeeRatingRouter);

//require('./routes/index.js')(app);

//app.listen(port);
module.exports = app;