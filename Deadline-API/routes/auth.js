const User = require('../models/User.js');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controller/auth.js');
const { ExtractJwt } = require('passport-jwt');
require('dotenv/config');


// Token protected routes
router.post("/update-profile",passport.authenticate('jwt'), authController.updateProfile);
router.get("/get-profile", passport.authenticate('jwt'), authController.getProfile);
router.delete("/delete-account", passport.authenticate('jwt'), authController.deleteAccount);

// Session based routes
router.post("/login",passport.authenticate('local'), authController.login);
router.get("/logout", authController.logout);
router.get("/get-user", authController.getUser);


// Public routes
router.post("/register", authController.register);






module.exports = router;