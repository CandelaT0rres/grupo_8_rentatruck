module.exports = (sequelize, dataTypes) => {
    let alias = "Viaje"
    let columnas = {
        id: {
            type : dataTypes.INTEGER,
            primaryKey: true, 
            allowNull : false,
            autoIncrement : true
        },
        tiempo_salida: {
            type: dataTypes.DATE,
            allowNull : false
        },
        tiempo_llegada: {
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
        cantidad_km: {
            type: dataTypes.STRING,
            allowNull : false
        },
        id_estado_viaje: { 
            type: dataTypes.INTEGER,
            allowNull : false
        },  
        id_vehiculo: {
            type: dataTypes.INTEGER,
            allowNull : false
        },

        id_paquete_viaje: { 
            type: dataTypes.INTEGER,
            allowNull : false 
        }
                           
    };
    let configuracion = {
        tableName : "viaje",
        timestamps : false
    };
    const Viaje = sequelize.define(alias, columnas, configuracion);
    Viaje.associate = function (models) {
        Viaje.hasMany(models.Estado_viaje, {
            as: 'estado_viaje',
            foreignKey: 'id_estado_viaje'
        })
    }
    return Viaje;
}
