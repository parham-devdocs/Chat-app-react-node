const mongoose=require('mongoose')

const connecttoMongoDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('connected to mongo db')
    } catch (error) {
        console.log('something went wrong');
        
    }
}

module.exports=connecttoMongoDb