const Post = require("../Models/Post");
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../uploads/boshqaruv");
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
const upload = multer({ storage });

class PostController{
  async addNewPost(req,res){
    upload.single('image')(req,res, async (err)=>{
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }
      try {
        const {
          title,
          description,
        } = req.body
        const filePath = `/uploads/boshqaruv/${req.file.filename}`;
        console.log(req.user);

        const data = await Post.create({
          title,
          description,
          filePath,
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
module.exports = new PostController()