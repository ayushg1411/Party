const { Sequelize, DataTypes } = require('sequelize');

const sequelize= require('../sequelize')

const Booking = sequelize.define('Booking', {
    bookingId: {
      type: DataTypes.STRING, // Assuming you want to use UUID for booking IDs
      primaryKey: true,
     
    },
    userId: {
      type: DataTypes.INTEGER, // Assuming userId is an integer
      allowNull: false,
    },
    timeIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeOut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    parkingId: {
      type: DataTypes.INTEGER, // Assuming parkingId is an integer
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('success', 'pending', 'terminated'),
      allowNull: false,
      defaultValue: 'pending', // Set the default status to 'pending'
    },
  });
  sequelize.sync()
    .then(() => {
      console.log('Database and tables created!');
    })
    .catch((error) => {
      console.error('Error creating database and tables:', error);
    });
  
  
  
  module.exports = Booking;
  