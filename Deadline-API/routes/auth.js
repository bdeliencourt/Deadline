const User = require('../models/User.js');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controller/auth.js');
const { ExtractJwt } = require('passport-jwt');
require('dotenv/config');


// Token protected routes
router.post("/update-profile",passport.authenticate('jwt'), authController.updateProfile);

// Session based routes
router.post("/login",passport.authenticate('local'), authController.login);
router.get("/logout",passport.authenticate('local'), authController.logout);

// Public routes
router.post("/register", authController.register);

module.exports = router;