// module.exports = (sequelize, dataTypes) => {
//     let alias = "Paquete_viaje"
//     let columnas = {
//         id: {
//             type : dataTypes.INTEGER,
//             primaryKey: true, 
//             allowNull : false,
//             autoIncrement : true
//         },
//     };
    
//     let configuracion = {
//         tableName : "paquete_viaje",
//         timestamps : false
//     };
//     const Paquete_viaje = sequelize.define(alias,columnas,configuracion);
//     Paquete_viaje.associate= function (models){
//         Paquete_viaje.hasMany(models.Viaje,{
//            as: "viaje",
//            foreingKey: "id_paquete_viaje"
//         })

//         Paquete_viaje.hasMany(models.Producto,{
//             as: "producto",
//             foreingKey: "id_paquete_viaje"
//         })
//     }
//     return Paquete_viaje

// }