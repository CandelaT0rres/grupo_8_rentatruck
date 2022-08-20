const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.listen (3005, () => {
    console.log('Servidor corriendo en el puerto 3005');
});

app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});