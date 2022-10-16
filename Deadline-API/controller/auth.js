const User = require('../models/User.js');
require('dotenv/config');
// Token encrypt and decrypt
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Register route
exports.register = (req, res) => {
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

      res.status(200).send({
        success: true,
        header: "GET login",
        result: {token : token}
      });
};

// Log out route
exports.logout = (req, res) => {
  if(req.isAuthenticated())
  {
    req.logout((err, data) => {
      if (err) { 
        res.json({success: false, header : "GET logout", result: err});
      }
      res.json({success: true, header : "GET logout", result: data});
    });
  } 
}

// Update profile
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
    .catch((error => res.status(500).json({ success: false, header : "POST update profile", result: error})));
};

// Get user profile
exports.getProfile = (req, res) => {
  User.findOne({_id : req.user._id})
  .then((user) => res.status(200).json({ success: true, header : "GET Profil", result: user}))
  .catch((error) => res.status(500).json({ success: false, header : "GET Profile", result: error}));

}


// Get user token : unlock routes
exports.getUser = (req, res) => {
  if(req.isAuthenticated())
  {
    const token = jwt.sign(
      {
        userId: req.user._id.toString(),
        username: req.user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ success: true, header : "GET User", result: {token : token}});
  }
  else
  {
    res.status(500).json({ success: false, header : "GET User"});

  }
}

exports.deleteAccount = (req, res) => {
  User.deleteOne({_id : req.user._id.toString()})
  .then((success) => res.status(200).json({ success: true, header : "Delete Account", result: success}))
  .catch((error) => res.status(500).json({ success: false, header : "Delete Account", result: error}));
}