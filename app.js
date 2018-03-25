const express = require('express')
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');

const app = express()

mongoose.connect("mongodb://localhost/pokemon");// Connect se conecta a la BD
                                                // tenemos que especificar en que host está y que base de datos queremos, en este caso pokemon. Si no existe la crea.

// configuracion de ejs view engine
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// middelwares que usamos
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configuracion del static
app.use(express.static(path.join(__dirname, 'public')));
// ruta que vamos a usar
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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


app.listen(3000);


module.exports = app;