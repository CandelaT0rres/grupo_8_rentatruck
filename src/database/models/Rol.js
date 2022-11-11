// module.exports = (sequelize, dataTypes) => {
//     let alias = "Rol"
//     let columnas = {
//         id: {
//             type : dataTypes.INTEGER,
//             primaryKey: true, 
//             allowNull : false,
//             autoIncrement : true
//         },
//         nombre: { 
//             type: dataTypes.STRING,
//             allowNull : false 
//         }
//     };
    
//     let configuracion = {
//         tableName : "rol",
//         timestamps : false
//     };
//     const Rol = sequelize.define(alias, columnas, configuracion);
    
//     Rol.associate = function (models) {
//         Rol.hasMany(models.Usuario, {
//             as: 'usuario_rol',
//             foreignKey: 'id_rol'
//         })
//     }
//     return Rol;
// }
