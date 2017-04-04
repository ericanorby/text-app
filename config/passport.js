const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const User = require("../db/models.js").User

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  passport.use("local-signup", new LocalStrategy({
      usernameField: "email",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({email: email}, function(err, user) {
          if (err) {
            return done(err)
          }
          if (user) {
            return done(null, false);
          }
          else {
            var newUser = new User()
            newUser.email = email
            newUser.password = newUser.generateHash(password)
            newUser.firstname = req.body.firstname
            newUser.lastname = req.body.lastname
            newUser.phone = req.body.phone
            newUser.save(function(err) {
              if (err) {
                throw err
              }
              return done(null, newUser)
            })
          }
        })
      })
  }))

  passport.use("local-login", new LocalStrategy({
      usernameField: "email",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({email: email}, function(err, user) {
          if (err) {
            return done(err)
          }
          if (!user || !user.validPassword(password)) {
            return done(null, false);
          }
          return done(null, user)
        })
      })

  }))

}
