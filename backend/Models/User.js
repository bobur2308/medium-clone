const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  role:{
    type: String,
    default: 'user'
  },
  posts:{
    type: Array,
    default: []
  },
  imagePath:{
    type: String,
    default: ''
  }
},
{
  timestamps: true
});
const User = mongoose.model('User', UserSchema);
module.exports = User;