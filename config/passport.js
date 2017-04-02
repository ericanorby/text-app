// const passport = require("passport")
// const LocalStrategy = require("passport-local").Strategy
// const DigestStrategy = require("passport-http").DigestStrategy
// const User = require("../db/models.js").User

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../db/models.js').User;

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = "hello";
  passport.use(new JwtStrategy(opts, function(payload, done) {
    User.findOne({id: payload.id}, function(err, user) {
      console.log(user)
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
}));
}
// exports.isAuthenticated = passport.authenticate('basic', { session : false });

// module.exports = function(passport) {
//
//   passport.serializeUser(function(user, done) {
//     done(null, user.id)
//   })
//
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user)
//     })
//   })
//
//   passport.use("local-signup", new LocalStrategy({
//       usernameField: "email",
//       passReqToCallback: true
//     },
//     function(req, email, password, done) {
//       process.nextTick(function() {
//         User.findOne({email: email}, function(err, user) {
//           if (err) {
//             return done(err)
//           }
//           if (user) {
//             return done(null, false, req.flash("signupMessage", "That email is already taken."));
//           }
//           else {
//             var newUser = new User()
//             newUser.email = email
//             newUser.username = req.body.username
//             newUser.password = newUser.generateHash(password)
//             newUser.firstname = req.body.firstname
//             newUser.lastname = req.body.lastname
//             newUser.phone = req.body.phone
//             newUser.save(function(err) {
//               if (err) {
//                 throw err
//               }
//               return done(null, newUser)
//             })
//           }
//         })
//       })
//
//   }))
//
//   passport.use("local-login", new LocalStrategy({
//       usernameField: "email",
//       passReqToCallback: true
//     },
//     function(req, email, password, done) {
//       process.nextTick(function() {
//         User.findOne({email: email}, function(err, user) {
//           if (err) {
//             return done(err)
//           }
//           if (!user || !user.validPassword(password)) {
//             return done(null, false, req.flash("loginMessage", "Incorrect email or password."));
//           }
//           return done(null, user)
//         })
//       })
//
//   }))
//
// }
