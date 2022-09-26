//Importación express + path
const express = require("express");
const path = require("path");

//Ejecución express
const app = express();

//Importación enrutadores
const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');

//Haciendo estatica a public
app.use(express.static(path.join(__dirname,"../public")));

//Seteo EJS
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

//Seteo POST
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

//Rutas
app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);

//Servidor
app.listen(process.env.PORT || 3005, function() {
    console.log("Servidor corriendo en el puerto 3005");
});

