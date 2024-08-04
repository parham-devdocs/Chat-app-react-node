const express = require("express")
const routes = express.Router()
const protectRoutes = require('../middlewares/protectRoute')
const getUsersForSidebar=require('../controllers/users')
routes.get('/',protectRoutes, getUsersForSidebar)


module.exports=routes