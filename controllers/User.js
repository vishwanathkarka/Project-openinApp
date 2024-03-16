const mongoose = require("mongoose");
const User = require("../models/User");
const BigPromise = require("../middleware/Bigpromise");
const CustomError = require("../util/customError");
const Jwt = require("jsonwebtoken")

exports.accountCreate = BigPromise(async (req, res, next) => {
 
    const { phone_number, priority } = req.body;
   if(!phone_number ){
    throw new CustomError("Phone Number or Priority required", 400);
   }
if(phone_number.toString().length!=10){
    throw new CustomError("Phone Number Should be 10 digits", 400);
}
const userFind = await User.find({phone_number})
console.log(userFind)
// if(userFind){
//     throw new CustomError("Phone Number is already been used", 400);
// }
   const userAccount = await User.create({phone_number,priority})
      res.status(200).json({
        success: true,
        userAccount
      });} 
  );
exports.addCookie = BigPromise(async(req,res,next)=>{
    const { id } = req.params;
    const token = Jwt.sign({ id }, process.env.JWT_SECRET_KEY);
    res.status(200).cookie("token",token).json({
        status:true,
        token,
    })
})