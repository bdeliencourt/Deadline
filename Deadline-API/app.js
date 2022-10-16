const express = require('express');
const app = express();
const auth = require("./middleware/auth.js")();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const authRoute = require('./routes/auth.js');
const cors = require('cors');
const passport = require('passport');
const User = require('./models/User.js');
const postRoute = require("./routes/auth.js");
const session = require('express-session');


// Read .env file
require('dotenv/config');

// parse application/x-www-form-urlencoded
var jsonParser = express.json({
  type: 'application/json',
  extended: true
});

var urlencodedParser = express.urlencoded({
  extended: true,
  type: 'application/x-www-form-urlencoded'
})

// Fix Access Control Allow Credentials
const corsOptions = {
  origin: 'http://192.168.1.20:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true //access-control-allow-credentials:true
};

// Middlewares
// Force credentials
app.use(cors(corsOptions));

// Allow JSON request
app.use(jsonParser);
app.use(urlencodedParser);

// Passport configuration
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL}),
    saveUninitialized: false,
    name: "deadline_cookies",
    cookie: { secure: false, httpOnly: false, maxAge : 2592000, expires : new Date(new Date().getTime() + (1000*60*60*24))}
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use routes
app.use(authRoute);
app.use(postRoute);

// Connect to DB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error on connected DB'));

// Start listening
app.listen(process.env.PORT_SERVER, () => {
  console.log(`Listening on port ${process.env.PORT_SERVER}`);
});
