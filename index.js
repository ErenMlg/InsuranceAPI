const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const app = express();



app.get('/', (req, res) => {
    res.send("Hello From Node API :)")
});

var url = process.env.MONGO_URL;
mongoose.connect(url)
  .then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log('Connection Failed!'));