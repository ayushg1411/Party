const router =require("express").Router();
const countryController = require("../Controllers/countryController");
const verifyToken=require("../Middlewares/jwt_tokens")


router.post('/', verifyToken, countryController.addCountry)
router.get('/', countryController.getCountries);
router.get('/:id', countryController.getcountrybyid);



module.exports = router; 


