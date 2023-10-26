const router = require("express").Router();
const parkingController = require("../Controllers/parkingController");
const verifyToken = require("../Middlewares/jwt_tokens");
router.post("/", verifyToken, parkingController.addParking);
router.get("/:id", parkingController.getParkingbyId);

module.exports = router;
