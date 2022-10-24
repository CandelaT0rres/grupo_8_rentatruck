//Importo path + multer
const path = require('path');
const multer = require('multer');

//Seteo
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, path.join(__dirname, '../../public/img/img-users/'));
//     },
//     filename: (req, file, cb) =>{
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

const fileFilter = (req, file, cb) => {
    let type = file.mimetype.startsWith('image/')
    let extencionesAceptadas = [".jpg", ".png", ".gif", ".jpeg"];
    let extencion = path.extname(file.originalname);
    type && extencionesAceptadas.includes(extencion) ? cb(null, true) : cb(null, false); 
}

const upload = multer({storage : storage, fileFilter : fileFilter});

module.exports = upload;
