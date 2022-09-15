const express = require("express");
const path = require("path");
const app = express();
const homeRouter = require('./routes/homeRouter');
const productsRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');


app.use(express.static(path.join(__dirname,"../public")));
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');
app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);


/*app.listen(3005, ()=>{
   console.log("servidor corriendo puerto 3005")});
*/

app.listen(process.env.PORT || 3005, function() {
    console.log("Servidor corriendo en el puerto 3005");
});

