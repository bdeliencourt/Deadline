const express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

// Read .env file
require('dotenv/config');

const app = express();


// Connect to DB
mongoose.connect(process.env.DB_URL)
.then(() => console.log("Connected to DB"))
.catch(err => console.log("Error on connected DB"));


// Start listening
app.listen(process.env.PORT_SERVER, () => {
    console.log(`Listening on port ${process.env.PORT_SERVER}`)
  })