const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURI);
    console.log('MongoDB connection SUCCESS to =>', conn.connection.host);
  } catch (error) {
    console.error('MongoDB connection FAIL');
    process.exit(1);
  }
}

module.exports = connectDB;