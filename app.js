const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname,"./public")));

app.listen(3005, ()=>{
    console.log("servidor corriendo puerto 3005")});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/home.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/login.html"))
});

app.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/carrito.html"))
});

app.get("/productos", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/productos.html"))
});