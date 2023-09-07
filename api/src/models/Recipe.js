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
      unique: true
    },

    image: {
      type: DataTypes.STRING
    },

    summary: {
      type: DataTypes.TEXT
    },

    healthScore: {
      type: DataTypes.FLOAT
    },

    steps: {
      type: DataTypes.TEXT
    },

    readyInMinutes: {
      type: DataTypes.INTEGER
    },

    veryPopular: {
      type: DataTypes.BOOLEAN
    }

    
  }, {
    timestamps: false
  });
};
