const errorHandler = require("../Middlewares/ErrorMiddleware")
const User = require("../Models/User")
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const Post = require("../Models/Post");


const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads/post-files");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const timestamp = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`; // Format: HHMMSS
    const fileName = `${date}-${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});
const postUpload = multer({ storage: postStorage });


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
      const posts = await Post.find({authorId:req.user.userId})
      res.status(200).json({
        message:"Success",
        user,
        posts
      })
    } catch (error) {
      errorHandler(error,res)
    }
  }
  async addNewPost(req,res){
    postUpload.single('image')(req,res, async (err)=>{
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }
      try {
        const {
          title,
          description,
        } = req.body
        const user = await User.findById(req.user.userId)
        const filePath = `/uploads/post-files/${req.file.filename}`;
        // console.log(req.user);

        const data = await Post.create({
          title,
          description,
          filePath,
          authorId:req.user.userId
        })

        user.posts.push(data._id)
        await user.save()
        
        res.status(200).json({
          message:"Success",
          data,
          user
        })
      } catch (error) {
        errorHandler(error,res)
      }
    })
  }
  async editPostById(req,res){
    const {id} = req.params
    postUpload.single('image')(req,res,async (err)=>{
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }
      try {
        const {
          title,
          description,
          isActive
        } = req.body
        const data = await Post.findById(id)
        if(!data){
          return res.status(404).json({
            message:"Post not found !"
          })
        }
        if(data.authorId !== req.user.userId){
          return res.status(400).json({
            message:"You are not creator of post !"
          })
        }
        let filePath = data.filePath
        if(req.file){
          filePath = `/uploads/post-files/${req.file.filename}`;
        }
        data.title = title ? title : data.title
        data.description = description ? description : data.description
        data.filePath = filePath
        data.isActive = isActive ? isActive : data.isActive
        await data.save()

        res.status(200).json({
          message:"Success",
          data
        })
      } catch (error) {
        errorHandler(error,res)
      }
    })
  }
  async deletePostById(req, res) {
    try {
      const { id } = req.params;
  
      // Find the post by ID
      const post = await Post.findById(id);
      const user = await User.findById(req.user.userId);
      if (!post) {
        return res.status(404).json({
          message: "Post not found!",
        });
      }
  
      // Update user's posts array by removing the post ID
      user.posts = user.posts.filter(item => item.toString() !== id.toString());
      await user.save();
  
      // Remove the associated image file
      if (post.filePath) {
        const fullFilePath = path.join(__dirname, `..${post.filePath}`);
        fs.unlink(fullFilePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err.message);
          }
        });
      }
  
      // Delete the post from the database
      await Post.findByIdAndDelete(id);
  
      res.status(200).json({
        message: "Post deleted successfully!",
        user,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  }  
}
module.exports = new UserController()