const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img: {
      type: DataTypes.STRING
    },

    resume: {
      type: DataTypes.TEXT
    },

    hlevel: {
      type: DataTypes.INTEGER
    },

    steps: {
      type: DataTypes.TEXT
    },

    
  }, {
    timestamps: false
  });
};
