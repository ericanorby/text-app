"use strict"

const express = require("express")
const app = express()
const port = process.env.API_PORT || 3001
const mongoose = require("./db/connection.js")
const parser = require("body-parser")
const jwt = require("express-jwt")
const User = require("./db/models.js").User
const Group = require("./db/models.js").Group
const auth = require("./config/auth.js")

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

const authCheck = jwt({
  secret: auth.secret,
  audience: auth.audience
})

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

    // if (!user) {
    //   res.send({ success: false, message: 'Authentication failed. User not found.' });
    // } else {
    //   var token = jwt.sign(user, "hello", {
    //         expiresIn: 10080 // in seconds
    //       });
    //
    //   res.json({ success: true, token: 'JWT ' + token });

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
    // }
  })
})

// app.get("/api/profile", passport.authenticate('jwt', { session: false }), function(req, res) {
//   // res.send('It worked! User id is: ' + req.user._id + '.');
//   res.json(req.user)
// });

app.get("/api/profile", authCheck, function(req,res){
  User.findOne({email: "sandy@email.com"}).populate('groups').exec(function(err, user){
    res.json({
      user: user,
      groups: user.groups
    })
  })
})

app.post("/api/group/new", function(req,res){
  if (req.body.creator.groups.length >= 9) {
    console.log("too many groups!")
  }
  else {
    var newGroup = new Group({
      title: req.body.title,
      creator: req.body.creator._id,
      users: []
    })
    newGroup.save(function(err,group){
      if (err) {
        console.log(err)
      }
      User.findOne({_id: req.body.creator._id}).then(function(user){
        user.groups.push(group)
        user.save(function(err){
          if (err) {
            console.log(err)
          }
        })
      })
    })
  }
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
    //check to see if user is already a member
    var proceed = true
    if (group.users.length >= 9) {
      proceed = false
    }
    group.users.forEach((user) => {
      if (user == req.body.user._id){
        proceed = false
        res.json({success: false, message: "User is already a member."})
      }
    })
    //if user is not a member, proceed
    if (proceed){
      group.users.push(req.body.user)
      group.save(function(err, group){
        User.findOne({_id: req.body.user._id}).then(function(user){
          user.groups.push(group)
          user.save(function(err){
            if (err) {
              return res.json({ success: false, message: 'User could not be added to the group.'})
            }
            res.json({ success: true, message: 'User was added to the group.' })
          })
        })
        if (err) {
          return res.json({ success: false, message: 'User could not be added to the group.'})
        }
      })
    }
  })
})

app.post("/api/users/search", function(req, res){
  User.findOne({phone: req.body.input}).then(function(user){
    res.json(user)
  })
})

app.listen(port, function(){
  console.log("Port works yooooo")
})
