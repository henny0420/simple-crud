const mongoose = require('mongoose')
// const uri=process.env.mongo_uri

const connectDB = async() => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log(process.env.MONGO_URI);
        
        console.log('mongoDB connected successfully');
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
} 

module.exports = connectDB