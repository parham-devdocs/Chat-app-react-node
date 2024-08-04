const express = require("express");
const { sendMessage, recieveMessage } = require("../controllers/message.js");

const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/send/:userId",protectRoute,sendMessage);
router.get("/:id", protectRoute, recieveMessage);
module.exports=router