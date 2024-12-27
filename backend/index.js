require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./Config/db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.get('/', (req, res) => {
  res.send('<h1>Server is running</h1>' );
})
// routes




connectDB()
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port => ${port}`);
})

