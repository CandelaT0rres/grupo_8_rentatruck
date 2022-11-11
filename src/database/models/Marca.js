// module.exports = (sequelize, dataTypes) => {
//     let alias = "Marca"
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
//         tableName : "marca",
//         timestamps : false
//     };
//     const Marca = sequelize.define(alias, columnas, configuracion);
//     Marca.associate = function (models) {
//         Marca.hasMany(models.Vehiculo, {
//             as: 'vehiculo',
//             foreignKey: 'id_marca'
//         })
//     }
    
//     return Marca;
// }
