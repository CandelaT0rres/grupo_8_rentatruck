
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
            allowNull : true
        },
        precio_km: { 
            type: dataTypes.NUMBER,
            allowNull : false
        },
        ruta_img: {
            type: dataTypes.STRING,
            allowNull: true
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
        tableName : "vehiculo",
        timestamps : false
    };

    const Vehiculo = sequelize.define(alias, columnas, configuracion);
     Vehiculo.associate = function (models) {

        Vehiculo.belongsTo(models.Marca, {
            as: 'marcas',
            foreignKey: 'id_marca'
        })

        Vehiculo.belongsToMany(models.Usuario,{
            as: 'usuarios',
            through: 'vehiculo_usuario',
            foreignKey: 'id_vehiculo',
            otherKey: 'id_usuario',
            timestamps: false
        })

        Vehiculo.hasMany(models.Viaje,{
            as: 'viajes',
            foreignKey: 'id_vehiculo'
        })

        Vehiculo.belongsTo(models.Tipo_mercaderia,{
            as: 'tipo_mercaderia',
            foreignKey: 'id_tipo_mercaderia'
        })
     }
    return Vehiculo;
}

