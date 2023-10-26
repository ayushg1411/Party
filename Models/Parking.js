const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Parking = sequelize.define("Parking", {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pricing: {
    type: DataTypes.DECIMAL(10, 2), // Adjust the precision and scale as needed
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  // You can add more fields as needed, such as timestamps, foreign keys, etc.
});

// Establish the foreign key relationship: a City belongs to a Country

sequelize
  .sync() // Use { force: true } only for initial table creation
  .then(() => {
    console.log("Tables synced with the database.");
  })
  .catch((err) => {
    console.error("Error syncing tables:", err);
  });
module.exports = Parking;
