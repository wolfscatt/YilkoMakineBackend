var router = require('../routes/routes')
var User = require('../models/user')
var jwt = require('jwt-simple')

const userDataRequest = (request) => {
    return new User ({
        userName:request.body.userName,
        password:request.body.password
    })
}
router.post("/register", async (request,response) =>{
    var userData = userDataRequest(request)
    await userData.save()
    .then(result =>{
        return response.status(201).send({msg:result})
    })
    .catch(error =>{
        console.log(error)
        return response.status(500).send({msg: error})
    })
})


router.post('/login', async (request, response) => {
    var userData = userDataRequest(request)
    var user = await User.findOne({userName:userData.userName})
    if(!user){
        return response.status(401).send({message:"UserName or password invalid"})
    }
    if(userData.password != user.password){
        return response.status(401).send({message:"UserName or password invalid"})
    }
    var payload = {}
    var token = jwt.encode(payload,'12345')
    return response.status(200).send({token})
})

var user = {router, checkAuthenticated:(request, response, next)=>{
    if(!request.header('authorization')){
        return response.status(401).send({message:'Unauthorized. No Authorization Header'})
    }
    var token = request.header('authorization').split(' ')[1]
    var payload = jwt.decode(token,"12345")
    if(!payload){
        return response.status(401).send({msg:"Unauthorized. Token is not valid"})
    }
    next()
}}

module.exports = user