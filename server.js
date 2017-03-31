"use strict"

const express = require("express")
const mongoose = require("./db/connection.js")
const parser = require("body-parser")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      console.log(user)
      // if (err) { return done(err); }
      // if (!user) {
      //   return done(null, false, { message: 'Incorrect username.' });
      // }
      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      return done(null, user)
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

const User = require("./db/models.js").User

const app = express()

const port = process.env.API_PORT || 3001

// app.use(session({
//   store: new RedisStore({
//     url: config.redisStore.url
//   }),
//   secret: config.redisStore.secret,
//   resave: false,
//   saveUninitialized: false
// }))
app.use(session({secret: 'secretKey'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.get("/api", function(req, res){
  User.find({}).then((users) => {
    res.json(users)
  })
})

app.post("/api/login",
  // function(req,res){
  //   console.log(req.body.username)
  // }
  passport.authenticate("local", { successRedirect: "/api",
                                   failureRedirect: "/api/login",
                                   failureFlash: true })

)

app.listen(port, function(){
  console.log("Port works yooooo")
})
