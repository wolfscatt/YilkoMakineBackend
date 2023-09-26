var mongoose = require("mongoose")

var productSchema = new mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    imageUrl:{
        type: String,
        default: "https://t.ly/xMCSB"
    }
})

module.exports = mongoose.model("Product", productSchema)