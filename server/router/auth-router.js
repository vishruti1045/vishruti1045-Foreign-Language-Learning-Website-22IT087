const express=require("express");
const router=express.Router();
const authcontrol=require("../controllers/auth-controller");


//router.route('/home').get(authcontrol.home);
router.route('/login').post(authcontrol.login);
router.route('/register').post(authcontrol.register);

module.exports=router;