"use strict"

const express = require("express")
const app = express()
const port = process.env.API_PORT || 3001
const mongoose = require("./db/connection.js")
const passport = require("passport")
const flash = require("connect-flash")
const cookie = require("cookie-parser")
const parser = require("body-parser")
const session = require("express-session")

require("./config/passport")(passport)



//cookie-parser and body-parser setup
app.use(cookie())
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

//required for passport
app.use(session({secret: 'secretKey'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

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

app.get("/api/login", function(req, res){
  res.json({"message": req.flash("loginMessage")})
})

app.get("/api/signup", function(req, res){
  res.json({"message": req.flash('signupMessage')})
})

app.post("/api/signup", passport.authenticate("local-signup", {
  successRedirect: "/api/profile",
  failureRedirect: "/api/signup",
  failureFlash: true
}))

app.get("/api/profile", isLoggedIn, function(req, res){
  res.json({"user": req.user})
})

app.get("/api/logout", function(req, res){
  req.logout()
  res.redirect("/api")
})

//to make sure a user is logged in
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next()
  } else {
    res.redirect("/api")
  }
}

app.post("/api/login",
  // function(req,res){
  //   console.log(req.body.username)
  // }
  // passport.authenticate("local", { successRedirect: "/",
  //                                  failureRedirect: "/api/login",
  //                                  failureFlash: true })
  passport.authenticate("local"), function(req, res){
    console.log(req.user)
    // res.json(user)
  }

)

app.get("/api/user", function(req, res){
  console.log(req.user)
  // User.findOne({username: req.user.username})
})

app.listen(port, function(){
  console.log("Port works yooooo")
})
