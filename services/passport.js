const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {

    User.findOne({ email: email }, (err, user) => {

      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));

// passport.use('local-signup',
//   new LocalStrategy(
//     {
//       usernameField : 'email',
//       passwordField : 'password',
//       passReqToCallback : true
//     },
//   async (req, email, password, done) => {
//     const existingUser =  await User.findOne({ email : email });
//
//     if (existingUser) {
//       return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//     }
//
//     const randomstring = Math.random().toString(36).slice(-8);
//
//     let newUser = new User();
//     newUser.email    = emailRequest;
//     newUser.password = newUser.generateHash(randomstring);
//     newUser.requestDate = Date.now();
//
//     try {
//       await newUser.save();
//         done(null, newUser);
//     } catch (err) {
//       res.status(422).send(err);
//     }
//   })
// );
