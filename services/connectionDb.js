var mongoose = require("mongoose")

const uri = 'mongodb+srv://yilko:yilko.1234@yilkomakine.wmzkirm.mongodb.net/yilko_makine?retryWrites=true&w=majority'
const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Mongo Connected");
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB