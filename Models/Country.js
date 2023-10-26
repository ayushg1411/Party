const { Sequelize, DataTypes } = require('sequelize');
const City =require('./City');
const sequelize= require('../sequelize')
const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Country.hasMany(City, { foreignKey: 'CountryId' }); 
sequelize.sync() // Use { force: true } only for initial table creation
  .then(() => {
    console.log('Tables synced with the database.');
  })
  .catch((err) => {
    console.error('Error syncing tables:', err);
  });
module.exports = Country;
