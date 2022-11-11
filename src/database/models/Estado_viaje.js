// module.exports = (sequelize, dataTypes) => {
//     let alias = "Estado_viaje"
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
//         tableName : "estado_viaje",
//         timestamps : false
//     };
//     const Estado_viaje = sequelize.define(alias, columnas, configuracion);

//     Estado_viaje.associate = function (models) {
//         Estado_viaje.belongsTo(models.Viaje, {
//             as: 'estado_viaje',
//             foreignKey: 'id_estado_viaje'
//         })
        
//     };
//     return Estado_viaje;
// }
