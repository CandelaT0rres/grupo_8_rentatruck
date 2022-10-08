//Importo Path
const path = require('path');

//Importo multer + seteo multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) =>{
        let nombreImg = 'camiones-' + Date.now() + path.extname(file.originalname);
        cb(null, nombreImg);
    }
});
const upload = multer({storage : storage, fileFilter: (req, file, cb) => {
    let extencionesAceptadas = [".jpg", ".png", ".gif", ".jpeg"];
    let extencion = path.extname(file.originalname);
    extencionesAceptadas.includes(extencion) ? cb(null,true): cb(null,false);
   

}  
});

module.exports = upload; 

