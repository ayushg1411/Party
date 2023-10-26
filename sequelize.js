const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('bookapp', 'root', 'Data@12345', {
    dialect: 'mysql', // or 'postgres', 'sqlite', etc.
  });

  module.exports=sequelize;