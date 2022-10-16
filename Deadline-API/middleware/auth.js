
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/User");
const ExtractJwt = passportJWT.ExtractJwt;
require('dotenv/config');

// Token handler options
const opts = {};
// Secret code to decrypt and token location in HTTP Header
opts.secretOrKey = process.env.JWT_SECRET;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();


module.exports = () => {

  // Create Token strategy : check used name contained in Bearer header
// Retreive user in DB and check token validity 
const JWTStrategy = require("passport-jwt").Strategy;
passport.use(new JWTStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.userId }, function (err, user) {
        if (err) {
            return done(new Error("UserNotFound"), null);
            // Epoch in sec for jwt payload, ms for Data.now()
          } else if((jwt_payload.exp*1000)<=Date.now()) {
            console.log()
            return done(new Error("TokenExpired"), null);
          } else{
            return done(null, user);
          }
    });
}));

// Create a local strategy based on password and login for login and log-out
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
};


