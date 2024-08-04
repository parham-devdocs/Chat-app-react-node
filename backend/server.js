const express = require('express')
const dotenv = require('dotenv')
const port = process.env.PORT || 2000
const cookieParser=require("cookie-parser")
const app = express()
const authRoutes = require("./routes/auth")
const messageRoutes = require('./routes/message')
const userRoutes=require("./routes/users")
const connecttoMongoDb = require('./db/connectToMongoDb')
dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes) 
app.use("/api/messages", messageRoutes); 
app.use("/api/users",userRoutes)

app.listen(port, () => {
    connecttoMongoDb()
    console.log(`server is running on port ${port}`)
})