module.exports = (sequelize, dataTypes) => {
    let alias = "Tipo_mercaderia"
    let columnas = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey: true, 
            allowNull : false,
            autoIncrement : true
        },
        nombre: { 
            type: dataTypes.STRING,
            allowNull : false 
        }                  
    };
    
    let configuracion = {
        tableName : "tipo_mercaderia",
        timestamps : false
    };
    const Tipo_mercaderia = sequelize.define(alias, columnas, configuracion);
    
    return Tipo_mercaderia;
}