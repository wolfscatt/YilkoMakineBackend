var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
    userName:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model("User", userSchema)