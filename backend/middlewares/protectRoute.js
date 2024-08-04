const jwt = require("jsonwebtoken");
const User=require('../models/userModels')
const protectRoute =async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "unsuthorized user" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({message:"user not authorized"});
      }
      const user = await User.findById(decodedToken.userId).select("password")
      
      if (!user) {
        res.status(401).json({message:"user not found"})
      }
      req.user = user
      next()
  } catch (error) {
    console.log("error message ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};


module.exports=protectRoute