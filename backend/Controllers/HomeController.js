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
  async getUserById(req,res){
    try {
      const {id} = req.params
      const user = await User.findById(id)
      if(!user){
        return res.status(404).json({
          message:"User not found !"
        })
      }

      res.status(200).json({
        message:"Successs",
        data:user
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
  async getAllPosts(req,res){
    try {
      const posts = await Post.find({isActive:true})

      res.status(200).json({
        message:"Success",
        data:posts,
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
  async getPostById(req,res){
    try {
      const{id} = req.params
      const post = await Post.findById(id)
      if(!post){
        return res.status(404).json({
          message:"Post not found !"
        })
      }
      post.viewers = post.viewers +1
      await post.save()
      res.status(200).json({
        message:"Success",
        data:post
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
}
module.exports = new HomeController()