const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const {
    logErrors,
    wrapErrors,
    errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

// body parser
app.use(express.json());

// rutas
moviesApi(app);

// error 404
app.use(notFoundHandler);

// manejador de errores
// los errores siempre van despues de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, function () {
    console.log(`listening http://localhost:${config.port}`);
});