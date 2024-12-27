const mongoose = require('mongoose');

// Define the Post Schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  filePath: {
    type: String, // File path for the uploaded image or file
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // Name of the referenced model
    required: true,
  },
  likeCount:{
    type:Number,
    default:0
  },
  viewers:{
    type:Number,
    default:0
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Post model using the schema
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
