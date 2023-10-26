const { Transaction } = require("sequelize");
const Parking = require("../Models/Parking");

module.exports = {
  addParking: async (req, res, next) => {
    const cityId = req.body.cityId;
    const newParking = new Parking({
      location: req.body.location,
      capacity: req.body.capacity,
      pricing: req.body.pricing,
      isAvailable: req.body.isAvailable,
      CityId: cityId,
    });

    try {
      await newParking.save();

      res
        .status(201)
        .json({ status: true, messaga: "Parking Successfully Created" });
    } catch (error) {
      return next(error);
    }
  },

  // getCity: async (req, res, next) => {

  //     try {
  //       const country = await Country.findAll(
  //        { attributes: { exclude: ['createdAt', 'updatedAt'] } }
  //       );

  //       if (!country) {
  //         return res
  //           .status(401)
  //           .json({ status: false, message: "Country does not exist" });
  //       }
  //       return res
  //       .status(200)
  //       .json(country);
  //     } catch (error) {
  //       return next(error);
  //     }
  //   },

  getParkingbyId: async (req, res, next) => {
    try {
      const id = req.params.id;
      const parking = await Parking.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!parking) {
        return res
          .status(401)
          .json({ status: false, message: "parking does not exist" });
      }

      if (parking.capacity == 0) {
        return res
          .status(200)
          .json({ status: false, message: "Parking Not Available" });
      }

      return res.status(200).json(parking);
    } catch (err) {
      return next(err);
    }
  },
};
