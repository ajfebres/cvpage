const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');

passport.use(new LocalStrategy({usernameField: 'email'}, async function(email, password, done) {
    try {
        var user = await Users.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Incorrect Email' });
          }
        if (! await user.matchPass(password)) {
            return done(null, false, { message: 'Incorrect Password' });
          }
        return done(null, user);
    }catch(err){
        return done(err);
    };
}) );

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });