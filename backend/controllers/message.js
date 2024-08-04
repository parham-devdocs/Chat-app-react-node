const conversationModel = require("../models/conversation.js");
const messageModel=require('../models/messages.js')
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId: receiverId } = req.params;
    const senderId = req.user._id;


    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
          

      
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
               await conversation.save();

      }
      const newMessage = await messageModel.create({
        receiverId,
        senderId,
        message,
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id)
    }
   
    await Promise.all([conversation.save() , newMessage.save()])
    
      res.status(201).json(newMessage)
  } catch (error) {
    console.log("error message ", error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
const recieveMessage =async (req,res) => {
  try {
    const { id: userIdToChat } = req.params
    const senderId=req.user._id
    const conversation = await conversationModel.findOne({
      participants: { $all: [userIdToChat,senderId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).send([])
    }
    res.status(201).json(conversation.messages)
  } catch (error) {
      console.log("error message ", error.message);
      res.status(500).json({ message: "internal server error" });
  }

}
module.exports = {
  sendMessage,
  recieveMessage,
};