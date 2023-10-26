const router = require("express").Router();
const cityController = require("../Controllers/cityController");
const verifyToken = require("../Middlewares/jwt_tokens");

router.post("/", verifyToken, cityController.addCity);
// router.get('/', cityController.getCountries);
router.get("/:id", cityController.getCityById);

module.exports = router;
