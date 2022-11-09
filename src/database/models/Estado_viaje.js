module.exports = (sequelize, dataTypes) => {
    let alias = "Estado_viaje"
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
        tablaName : "estado_viaje",
        timestamps : false
    };
    const Estado_viaje = sequelize.define(alias, columnas, configuracion);
    
    return Estado_viaje;
}
