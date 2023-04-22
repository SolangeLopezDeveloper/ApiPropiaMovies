const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const createError = require('http-errors')
const app = express();


// view engine setup
app
.set('views', path.resolve(__dirname, './views'))
.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));
 

//rutas

const {actorsRouter,genresRouter,moviesRouter} = require('./v1/routes');
const createResponseError = require('./helpers/createResponseError');
app
.use('/api/v1/actors', actorsRouter)
.use('/api/v1/movies',moviesRouter)
.use('/api/v1/genres',genresRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, 'Endpoint no existente'));
  });
  
  // error handler
  app.use(function (error, req, res, next) {
    return createResponseError(res,error)
  });

//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));

//levantar con npm run dev//