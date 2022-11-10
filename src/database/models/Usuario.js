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
        contra: {
            type: dataTypes.STRING,
            allowNull : false
        }, 
        id_rol: {
            type: dataTypes.INTEGER,
            allowNull : false
        }                  
    };
    
    let configuracion = {
        tableName : "usuario",
        timestamps : false
    };
    const Usuario = sequelize.define(alias, columnas, configuracion);
    
    Usuario.associate = function (models) {
        Usuario.belongsTo(models.Rol, {
            as: 'usuarios',
            foreignKey: 'id_rol'
        })
    }

    return Usuario;
}

