const router = require("express").Router();
const bookingController = require("../Controllers/bookingController");
const verifyToken = require("../Middlewares/jwt_tokens");

router.post("/", verifyToken, bookingController.addBooking );
// router.get('/', cityController.getCountries);
// router.get("/:id", cityController.getCityById);

module.exports = router;
