module.exports = (sequelize, dataTypes) => {
    let alias = "Marca"
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
        tablaName : "marca",
        timestamps : false
    };
    const Marca = sequelize.define(alias, columnas, configuracion);
    
    return Marca;
}
