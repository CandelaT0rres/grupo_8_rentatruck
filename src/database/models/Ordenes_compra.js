module.exports = (sequelize, dataTypes) => {
    let alias = "Ordenes_compra";
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: dataTypes.INTEGER(11)
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
      total: {
        type: dataTypes.INTEGER(11),
        allowNull: false
      },
      createdAt: {
        type: dataTypes.DATE(),
        allowNull: false
      },
      updatedAt: {
        type: dataTypes.DATE(),
        allowNull: true
      },
      deletedAt: {
        type: dataTypes.DATE(),
        allowNull: true
      },
      
    };
    let config = {
        tableName: 'ordenes_compra',
        timestamps: true
    };
  
    const Ordenes_compra = sequelize.define(alias, cols, config);
  
    Ordenes_compra.associate = (models) => {

      Ordenes_compra.belongsTo(models.Usuario, {
        as:'ordenesUsuarios',
        foreignKey: 'id_usuario'
      });

    };
  
    return Ordenes_compra;
  };
  