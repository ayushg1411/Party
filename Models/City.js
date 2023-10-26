const { Sequelize, DataTypes } = require('sequelize');
const Parking =require('./Parking')
const sequelize= require('../sequelize')

const Country = require('./Country'); // Import the Country model

const City = sequelize.define('City', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  State:{
    type:DataTypes.STRING,
    allowNull:false
  },
  Country:{
    type:DataTypes.STRING,
    allowNull:false
  },
 
});
City.hasMany(Parking, { foreignKey: 'CityId' }); 
// Establish the foreign key relationship: a City belongs to a Country


sequelize.sync() // Use { force: true } only for initial table creation
  .then(() => {
    console.log('Tables synced with the database.');
  })
  .catch((err) => {
    console.error('Error syncing tables:', err);
  });
module.exports = City;
