module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario"
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
        },
        dni: {
            type: dataTypes.STRING,
            allowNull : false
        },
        telefono: {
            type: dataTypes.STRING,
            allowNull : false
        },
        apellido: {
            type: dataTypes.STRING,
            allowNull : false
        },
        direccion: {
            type: dataTypes.STRING,
            allowNull : false
        },
        email: {
            type: dataTypes.STRING,
            allowNull : false
        },
        id_rol: {
            type: dataTypes.INTEGER,
            allowNull : false
        },
        contra: {
            type: dataTypes.STRING,
            allowNull : false
        }                    
    };
    
    let configuracion = {
        tablaName : "usuario",
        timestamps : false
    };
    const Usuario = sequelize.define(alias, columnas, configuracion);
    
    return Usuario;
}

