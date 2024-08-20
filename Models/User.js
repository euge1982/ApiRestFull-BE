//Creacion del modelo de usuario

const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const User = sequelize.define('User', {

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
  password: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = User;