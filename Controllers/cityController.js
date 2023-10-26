const City = require("../Models/City");
const Parking = require("../Models/Parking");

module.exports = {
  addCity: async (req, res, next) => {
    const newCity = new City({
      name: req.body.name,
      State: req.body.State,
      Country: req.body.Country,
      CountryId: req.body.id,
    });

    try {
      await newCity.save();

      res
        .status(201)
        .json({ status: true, messaga: "city Successfully Created" });
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

  getCityById: async (req, res, next) => {
    try {
      const cityid = req.params.id;
      const city = await City.findOne({
        where: { id: cityid }, // Find the country by ID
        include: Parking,
      });
      if (!city) {
        return res
          .status(401)
          .json({ status: false, message: "city does not exist" });
      }
      return res.status(200).json(city);
    } catch (err) {
      return next(err);
    }
  },
};
