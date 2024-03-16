const BigPromise = require("./Bigpromise")
const User = require("../models/User")
const Jwt = require("jsonwebtoken")

const CustomError = require("../util/customError")

exports.authenticateToken = BigPromise( async(req,res,next)=>{
    const token =   req.header("Authorization") || req.cookies.token ;
    if(!token){
        next(new CustomError("Login is mandatory",400))
    }
     const userToken = await Jwt.verify(token,process.env.JWT_SECRET_KEY) 
     req.user  = await User.findById(userToken.id);
next()
})

