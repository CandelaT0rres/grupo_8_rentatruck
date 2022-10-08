//Importación express + path + session + Cookie-Parser
const express = require("express");
const path = require("path");
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Ejecución express
const app = express();

//Importación enrutadores
const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');

//Seteo POST
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Middlewares de aplicación
app.use(express.static(path.join(__dirname,"../public")));
const error404 = require('./middlewares/error404');
app.use(session({secret: 'Es un secreto papu', resave: false, saveUninitialized: false}));
/***ACA VA EL MIDDLEWARE DE COOKIE RECORDAME***/
app.use(cookieParser());

//Seteo EJS
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

//Rutas
app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);

//ERROR 404 
app.use(error404);

//Servidor
app.listen(process.env.PORT || 3005, function() {
    console.log("Servidor corriendo en el puerto 3005");
});
