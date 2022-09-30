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
const upload = multer({storage : storage});

module.exports = upload; 
