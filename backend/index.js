require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./Config/db');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send('<h1>Server is running</h1>' );
})

// routes
app.use('/api/auth', require('./Routers/AuthRouter'));

app.use('/api/profile',require('./Routers/UserRouter'))


connectDB()
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port => ${port}`);
})

