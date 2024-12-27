const Post = require("../Models/Post");

class PostController{
  async addNewPost(req,res){
    try {
      const {
        title,
        description,
      } = req.body
      const filePath = ``
    } catch (error) {
      errorHandler(error,res)
    }
  }
}
module.exports = new PostController()