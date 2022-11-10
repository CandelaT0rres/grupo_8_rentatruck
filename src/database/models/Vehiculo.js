
module.exports = (sequelize, dataTypes) => {
    let alias = "Vehiculo"
    let columnas = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey: true, 
            allowNull : false,
            autoIncrement : true
        },
        modelo: { 
            type: dataTypes.STRING,
            allowNull : false
            
        },
        patente:{
            type: dataTypes.STRING,
            allowNull : false
        },
        km : {
            type: dataTypes.STRING,
            allowNull : false
        },
        fecha_creacion :{
            type: dataTypes.DATE,
            allowNull : false
        },
        fecha_baja: {
            type: dataTypes.DATE,
            allowNull : false
        },
        precio_KM: { 
            type: dataTypes.NUMBER,
            allowNull : false
        },
        id_marca: {
            type: dataTypes.INTEGER,
            allowNull : false

        },
        id_usuario: { 
            type: dataTypes.INTEGER,
            allowNull : false
        },
        id_tipo_mercaderia: {
            type: dataTypes.INTEGER,
            allowNull : false 
        }                     
    };
    let configuracion = {
        tablaName : "vehiculo",
        timestamps : false
    };
    const Vehiculo = sequelize.define(alias, columnas, configuracion);
    
    return Vehiculo;
}

