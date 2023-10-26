const router =require("express").Router();
const authController=require("../Controllers/authController")

router.post('/register', authController.createUser)
router.post('/login', authController.loginUser);

module.exports = router;