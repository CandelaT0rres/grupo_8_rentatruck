const db = require('../database/models');

const controller = {
     home: (req , res) => {
      db.Usuario.findOne({
         where: {
            id: res.locals.userLogueado.id
         }
      })
         .then(() => {
            res.render ('home')
         })
         .catch(() => {
            res.render ('home')
         })
     }
};


module.exports = controller;