const errorHandler = require("../Middlewares/ErrorMiddleware")
const User = require("../Models/User")

class UserController{
  async getUserInfo(req,res){
    try {
      const user = await User.findById(req.user.userId)
      res.status(200).json({
        message:"Success",
        user
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
  async getAllPosts(req,res){
    try {
      const user = await User.findById(req.user.userId)
      res.status(200).json({
        message:"Success",
        user
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
  
}
module.exports = new UserController()