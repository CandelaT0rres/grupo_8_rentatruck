module.exports = (sequelize, dataTypes) => {
    let alias = "Producto"
    let columnas = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey: true, 
            allowNull : false,
            autoIncrement : true
        },
        nombre: { 
            type: dataTypes.STRING,
            allowNull : false
            
        },
        peso: {
            type: dataTypes.STRING,
            allowNull : false
        },
        ancho: {
            type: dataTypes.NUMBER,
            allowNull : false
        },
        largo: {
            type: dataTypes.NUMBER,
            allowNull : false
        },
        profundidad: {
            type: dataTypes.NUMBER,
            allowNull : false
        },
       
        id_tipo_mercaderia: {
            type: dataTypes.INTEGER,
            allowNull : false

        },
        id_paquete_viaje: { 
            type: dataTypes.INTEGER,
            allowNull : false
        }                    
    };

    let configuracion = {
        tablaName : "producto",
        timestamps : false
    };
    const Producto = sequelize.define(alias, columnas, configuracion);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Tipo_mercaderia, {
            as: 'tipo_mercaderia',
            foreignKey: 'id_tipo_mercaderia'
        })

        Producto.belongsTo(models.Paquete_viaje, {
            as: 'paquete_viaje',
            foreignKey: 'id_paquete_viaje'
        })
    
    return Producto;
}
}
