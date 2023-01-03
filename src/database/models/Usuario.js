module.exports = (sequelize, dataTypes) => {

    let alias = 'Usuario';
    
    let columnas = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey: true, 
            allowNull : false,
            autoIncrement : true
        },
        nombre: { 
            type: dataTypes.STRING(150),
            allowNull : false 
        },
        dni: {
            type: dataTypes.STRING(150),
            allowNull : false,
            unique: true
        },
        telefono: {
            type: dataTypes.STRING(150),
            allowNull : false
        },
        apellido: {
            type: dataTypes.STRING(150),
            allowNull : false
        },
        direccion: {
            type: dataTypes.STRING(150),
            allowNull : false
        },
        email: {
            type: dataTypes.STRING(150),
            allowNull : false,
            unique: true
        },
        contra: {
            type: dataTypes.STRING(255),
            allowNull : false
        }, 
        id_rol: {
            type: dataTypes.INTEGER,
            allowNull : false
        },
        img: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        createdAt: {type: dataTypes.DATE, allowNull: true},
        updatedAt: {type: dataTypes.DATE, allowNull: true},
        deletedAt: {type: dataTypes.DATE, allowNull: true}                 
    };
    
    let configuracion = {
        tableName : 'usuario',
        timestamps : true,
        paranoid: true,
        camelCase: false
    };
    const Usuario = sequelize.define(alias, columnas, configuracion);
    
    Usuario.associate = function (models) {
        
        Usuario.belongsTo(models.Rol, {
            as: 'usuarios',
            foreignKey: 'id_rol'
        });
        Usuario.belongsToMany(models.Vehiculo,{
            as: 'vehiculos',
            through: 'vehiculo_usuario',
            foreignKey: 'id_usuario',
            otherKey: 'id_vehiculo',
            timestamps: false
        });
        Usuario.hasMany(models.Ordenes_compra, {
            as:'ordenes',
            foreignKey: 'id_usuario'
        });
    };

    return Usuario;
}
