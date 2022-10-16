const User = require('../models/User.js');
require('dotenv/config');
// Token encrypt and decrypt
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Register route
exports.register = async (req, res) => {
  // Passport is waiting for username and password key-value
  // We skip req body checks, because all inputs are required in the form
    User.register(
      new User({
        email: req.body.email,
        username: req.body.username,
        phone: req.body.phone,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address
      }),
      req.body.password
    )
      .then((response) => {
        res.status(200).json({
          success: true,
          header: "POST register",
          result: response
        });
      })
      // Return error on registration
      .catch((error) =>
        res.status(500).json({
          success: false,
          header: "POST register",
          result: error
        })
      );
};

// Login route
exports.login = (req, res) => {
    // Logged with success, return a token to the user to protect further actions.
      // Return a token on login success
      const token = jwt.sign(
        {
          userId: req.user._id.toString(),
          username: req.user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      // Save token value in mongodb user session to make it permanent 
      req.session.passport.token = token;
      req.session.save();
      res.status(200).json({
        success: true,
        header: "GET login",
        result: token
      });
};

// Log out route
exports.logout = (req, res) => {
  req.logout((err, data) => {
    if (err) { 
      res.json({success: false, header : "GET logout", result: err});
    }
    res.json({success: true, header : "GET logout", result: data});
  });
}

exports.updateProfile = (req, res) => {

  // Update user fields : address and email
  User.updateOne({_id : req.user._id},
    {
      $set: {
        address : req.body.address,
        email : req.body.email
    }
    })
    .then((user) => res.status(200).json({ success: true, header : "POST update profile", result: user}))
    .catch((error => res.status(200).json({ success: false, header : "POST update profile", result: error})));
};

