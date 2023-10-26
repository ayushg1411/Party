const User = require("../Models/User");
const { Op } = require("sequelize");

module.exports = {
  deleteUser: async (req, res, next) => {
    try {
      await User.findByPk(req.user.id);
      if (!User) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      await User.destroy({ where: { id: req.user.id } });

      return res
        .status(204)
        .json({ status: true, message: "User Deleted Successfully" });
    } catch (error) {
      return next(error);
    }
  },

  search: async (req, res, next) => {
    const names = req.body.name;
    try {
      const foundUser = await User.findAll({
        where: {
          name: {
            [Op.like]: `%${names}%`, // Use wildcards for partial matching
          },
        }, // Search by username
      });

      if (!foundUser) {
        return res
          .status(401)
          .json({ status: false, message: "User does not exist" });
      }
      res.status(200).json(foundUser);
    } catch (err) {
      return next(err);
    }
  },

  getUser: async (req, res, next) => {
    const id = req.user.id;
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "User does not exist" });
      }

      return res.status(200).json({status:false, userData:user})
    } catch (error) {
      return next(error);
    }
  },
};
