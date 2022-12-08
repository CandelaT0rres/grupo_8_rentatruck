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

     Tipo_mercaderia.associate = function (models) {

        Tipo_mercaderia.hasMany(models.Vehiculo, {
            as: 'vehiculo',
            foreignKey: 'id_tipo_mercaderia'
        })

        Tipo_mercaderia.hasMany(models.Producto, {
            as: 'producto',
            foreignKey: 'id_tipo_mercaderia'
        })
    }
    
    return Tipo_mercaderia;
}