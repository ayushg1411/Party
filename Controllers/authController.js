const User = require("../Models/User");

const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res, next) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.secretKey
      ).toString(),
      role: req.body.role,
    });

    try {
      await newUser.save();

      res
        .status(201)
        .json({ status: true, messaga: "User Successfully Created" });
    } catch (error) {
      return next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      console.log(req.body.password);
      if (!user) {
        return res.status(200).json({ status: false, message: "User not found" });
      }

      const decryptedPassword = CryptoJs.AES.decrypt(
        user.password,
        process.env.secretKey
      );
      const decryptedString = decryptedPassword.toString(CryptoJs.enc.Utf8);
      console.log(decryptedString);
      if (decryptedString !== req.body.password) {
        return res
          .status(200)
          .json({ status: false, message: "Wrong password" });
      }

      const userToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWTSECRET,
        { expiresIn: "21d" }
      );

      const user_id = user.id;
      console.log(user.id);

      res.status(200).json({ status: true, id: user_id, token: userToken });
    } catch (error) {
      return next(error);
    }
  },
};
