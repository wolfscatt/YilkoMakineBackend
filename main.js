var express = require('express')
var bodyParser = require("body-parser")
const db = require('./services/connectionDb')
const productService = require('./services/productService')
const userService = require('./services/userService')

const cors = require('cors')


var app = express()
app.use(cors())
app.use(bodyParser.json())
db()

app.use('/products', productService.router)
app.use('/admin', userService.router)

app.listen(3000)
