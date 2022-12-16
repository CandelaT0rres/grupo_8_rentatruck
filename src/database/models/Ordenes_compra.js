module.exports = (sequelize, dataTypes) => {
    let alias = "Ordenes_compra";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vehiculo_id: {
        type: dataTypes.INTEGER(11),
        allowNull: true
      },
  
      modelo: {
        type: dataTypes.STRING(50),
        allowNull: false,
      },
      precio: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      cantidad: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      viaje_id: {
        type: dataTypes.INTEGER(11)
      }
    };
    let config = {
        tableName: 'ordenes_compra',
        timestamps: false
    };
  
    const Ordenes_compra = sequelize.define(alias, cols, config);
  
    Ordenes_compra.associate = (models) => {
        Ordenes_compra.belongsTo(models.Viaje, {
        as: "viaje",
      });
  
      Ordenes_compra.Viaje = Ordenes_compra.hasMany(models.Ordenes_compra, {
        as: 'ordenes'
      })
    };
  
    return Ordenes_compra;
  };
  