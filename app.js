var express = require('express');
var path = require('path');
var logger = require('morgan');
var router = require('./routes/router');
const main = require('./controller/base');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.get('/', main.index);
app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	return res.status(404).json({
            success: false,
            error: 'Not Found'
    });
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});

module.exports = app;