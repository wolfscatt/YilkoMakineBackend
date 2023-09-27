var mongoose = require("mongoose")

const uri = process.env.MONGODB_URI
const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Mongo Connected");
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB