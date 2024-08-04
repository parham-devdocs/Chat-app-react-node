const express = require("express");
const router = express.Router();
const {login,logout,signup}=require("../controllers/auth")
router.post("/login", login);
router.post("/signup",signup);
router.post("/logout", logout);

module.exports=router
