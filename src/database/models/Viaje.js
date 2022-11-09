module.exports = (sequelize, dataTypes) => {
    let alias = "Viaje"
    let columnas = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey: true, 
            allowNull : false,
            autoIncrement : true
        },
        id_paquete_viaje: { 
            type: dataTypes.INTEGER,
            allowNull : false 
        },
        id_vehiculo: {
            type: dataTypes.INTEGER,
            allowNull : false
        },
        tiempo_salida: {
            type: dataTypes.DATE,
            allowNull : false
        },
        tiempo_llegada:{
            type: dataTypes.DATE,
            allowNull : false
        },
        origen: {
            type: dataTypes.STRING,
            allowNull : false
        },
        destino: { 
            type: dataTypes.STRING,
            allowNull : false
        },
        cantidad_KM: {
            type: dataTypes.STRING,
            allowNull : false

        },
        id_estado_viaje: { 
            type: dataTypes.INTEGER,
            allowNull : false
        },                    
    };
    let configuracion = {
        tablaName : "viaje",
        timestamps : false
    };
    const Viaje = sequelize.define(alias, columnas, configuracion);
    
    return Viaje;
}
