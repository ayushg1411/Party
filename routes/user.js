const router =require("express").Router();
const userController=require("../Controllers/userController")
const verifyToken=require("../Middlewares/jwt_tokens")
router.delete('/',  verifyToken,userController.deleteUser)
router.get('/',verifyToken, userController.getUser);
router.get('/search', userController.search)

module.exports = router; 


