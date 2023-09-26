var express = require('express')
var bodyParser = require("body-parser")
const db = require('./services/connectionDb')
const productService = require('./services/productService')
const userService = require('./services/userService')
const mainService = require("./services/mainService")

const cors = require('cors')


var app = express()
app.use(cors())
app.use(bodyParser.json())
db()

app.use('/api', mainService.router)
app.use('/api/products', productService.router)
app.use('/api/admin', userService.router)

app.listen(process.env.PORT || 3000)

module.exports = app
