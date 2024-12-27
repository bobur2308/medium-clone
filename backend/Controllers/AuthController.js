const bcrypt = require('bcryptjs');
const errorHandler = require("../Middlewares/ErrorMiddleware");
const User = require("../Models/User");


class AuthController {
  async registerUser(req,res){
    try {
      const {userName,phone,email,password} = req.body;
      if(!userName || !phone || !email || !password){
        return res.status(400).json({message: 'All fields are required'});
      }
      const existingUser = await User.findOne({userName,email});
      if(existingUser){
        return res.status(400).json({message: 'User already exists'});
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const user = await User.create({
        userName,
        phone,
        email,
        password: hashedPassword
      })


      res.status(200).json({
        message: 'User registered successfully',
        user
      })
    } catch (error) {
      errorHandler(error,res);
    }
  }
}
module.exports =new AuthController();