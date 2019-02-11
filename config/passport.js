const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user_model');
const keys = require('./keys');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    // opts.secretOrKey = config.secret;
    opts.secretOrKey = keys.mongodb.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.getUserById(jwt_payload.data._id, (err, user) => {
        if(err){
          return done(err, false);
        }
  
        if(user){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }));
  }
