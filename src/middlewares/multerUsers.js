//Importo path 
const path = require('path');

//Importo multer + seteo
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/img/img-users'));
    },
    filename:(req, file, cb) => {
        let imgName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, imgName);
    }
});

const upload = multer({storage : storage, 
    fileFilter: (req, file, cb) => {
        let extencionesAceptadas = [".jpg", ".png", ".gif", ".jpeg"];
        let extencion = path.extname(file.originalname);
        extencionesAceptadas.includes(extencion) ? cb(null, true) : cb(null, false)} 
    });

module.exports = upload;
