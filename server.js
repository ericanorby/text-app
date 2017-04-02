"use strict"

const express = require("express")
const app = express()
var passport = require("passport")
const port = process.env.API_PORT || 3001
const mongoose = require("./db/connection.js")
var flash = require("connect-flash")
var cookie = require("cookie-parser")
var parser = require("body-parser")
var jwt = require("jsonwebtoken")
// var session = require("express-session")
// var MongoStore = require("connect-mongo")(session)
require("./config/passport")(passport)

const User = require("./db/models.js").User
const Group = require("./db/models.js").Group

app.use(cookie())
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

// app.use(session({
//   secret: 'lalalalalala',
//   store: new MongoStore({
//     url: "mongodb://localhost/text-app",
//     collection: "sessions"
//   })
// }))
app.use(passport.initialize())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.post('/api/signup', function(req, res) {
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

app.post('/api/login', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      var token = jwt.sign(user, "hello", {
            expiresIn: 10080 // in seconds
          });

      res.json({ success: true, token: 'JWT ' + token });

      // Check if password matches
      // user.comparePassword(req.body.password, function(err, isMatch) {
      //   if (isMatch && !err) {
      //     // Create token if the password matched and no error was thrown
      //     var token = jwt.sign(user, config.secret, {
      //       expiresIn: 10080 // in seconds
      //     });
      //     res.json({ success: true, token: 'JWT ' + token });
      //   } else {
      //     res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
      //   }
      // });
    }
  });
});

// app.get("/api/profile", passport.authenticate('jwt', { session: false }), function(req, res) {
//   // res.send('It worked! User id is: ' + req.user._id + '.');
//   res.json(req.user)
// });

app.get("/api/profile", function(req,res){
  User.findOne({email: "spongebob@email.com"}).populate('groups').exec(function(err, user){
    res.json({
      user: user,
      groups: user.groups
    })
  })
})

app.post("/api/group/new", function(req,res){
  var newGroup = new Group({
    title: req.body.title,
    users: []
  })
  newGroup.save(function(err){
    if (err){
      return err
    }
  })
})

app.get("/api/groups/:id", function(req, res){
  var popQuery = [{path: 'creator', model: 'User'}, {path: 'users', model: 'User'}]
  Group.findOne({_id: req.params.id}).populate(popQuery).exec(function(err, group){
    res.json({
      creator: group.creator,
      members: group.users
    })
  })
})

app.post("/api/groups/:id/add", function(req,res){
  Group.findOne({_id: req.params.id}).then(function(group){
    group.users.push(req.body.user)
    group.save()
    console.log(group)
  })
})

app.post("/api/users/search", function(req, res){
  User.findOne({phone: req.body.input}).then(function(user){
    res.json(user)
  })
})


// app.post("/api/signup",
// passport.authenticate("local-signup"), function(req,res){
//   console.log(req.user)
// }
// )
//
//
// app.post("/api/login",
//   passport.authenticate("local-login"), function(req,res){
//     console.log(req.user)
//   }
// )
//
// app.get("/api/profile",
//   passport.authenticate('digest', { session: false }),
//   function(req, res) {
//     // res.json(req.user);
//     console.log(req.user)
//   });

// app.get("/api/profile", function(req,res){
//   console.log("hello!")
// }
// )

app.listen(port, function(){
  console.log("Port works yooooo")
})
