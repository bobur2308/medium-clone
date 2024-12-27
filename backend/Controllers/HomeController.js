const errorHandler = require("../Middlewares/ErrorMiddleware")
const Post = require("../Models/Post")
const User = require("../Models/User")

class HomeController{
  async getAllUsers(req,res){
    try {
      const users = await User.find()
      
      res.status(200).json({
        message:"Success",
        data:users
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
  async getAllPosts(req,res){
    try {
      const posts = await Post.find({isActive:true})


      const sortedPosts = posts.map(item=>({
        id:item._id,
        title:item.title,
        description:item.description,
        author:item.authorId,
        date:item.createdAt
      }))

      res.status(200).json({
        message:"Success",
        data:sortedPosts,
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
}
module.exports = new HomeController()