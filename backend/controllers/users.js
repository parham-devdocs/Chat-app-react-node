const User=require('../models/userModels.js')
async function getUsersForSidebar (req,res) {
    
    try {
        const loggedInUserId = req.user._id
        const filteredUsers= await User.find({_id:{$ne :loggedInUserId}}).select("-password")
        res.status(201).send(filteredUsers)
    } catch (error) {
        console.log('error' , error.message)
        res.status(500).json({message:error.message})
    }
}

module.exports=getUsersForSidebar