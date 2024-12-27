const errorHandler = require("../Middlewares/ErrorMiddleware")
const User = require("../Models/User")
const path = require('path')
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
      res.status(200).json({
        message:"Success",
        user
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
        const filePath = `/uploads/post-files/${req.file.filename}`;
        // console.log(req.user);

        const data = await Post.create({
          title,
          description,
          filePath,
          authorId:req.user.userId
        })
        
        res.status(200).json({
          message:"Success",
          data
        })
      } catch (error) {
        errorHandler(error,res)
      }
    })
  }
  
}
module.exports = new UserController()