const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require("../Middlewares/ErrorMiddleware");
const User = require("../Models/User");


class AuthController {
  async registerUser(req,res){
    try {
      const {userName,phone,email,password,role} = req.body;
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
        password: hashedPassword,
        role
      })


      res.status(200).json({
        message: 'User registered successfully',
        user
      })
    } catch (error) {
      errorHandler(error,res);
    }
  }
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT tokens
      const accessToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,  // Add a secure secret in your environment variables
        { expiresIn: '15m' } // Access token expiration
      );
  
      const refreshToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,  // Add a secure secret in your environment variables
        { expiresIn: '7d' } // Refresh token expiration
      );
  
      // Save refresh token in HttpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true, 
        secure: false, 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      // Send access token in response
      res.status(200).json({
        message: 'User logged in successfully',
        accessToken,
        user,
      });
  
    } catch (error) {
      errorHandler(error, res);
    }
  } 
  async refreshToken(req, res) {
    const { refreshToken } = req.cookies;
  
    // Check if refresh token is provided
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
  
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  
      // Generate a new access token
      const accessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
  
      // Send the new access token
      res.status(200).json({ accessToken });
  
    } catch (error) {
      errorHandler(error,res);
    }
  }
  async logOut(req,res){
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure flag for production (HTTPS)
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 0, 
      });
    
      // Respond to client
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      errorHandler(error,res);
    }
  }
}
module.exports = new AuthController();