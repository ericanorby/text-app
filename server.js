"use strict"


const express = require("express")
const app = express()
const mongoose = require("./db/connection.js")
const port = process.env.API_PORT || 3001
const cookie = require("cookie-parser")
const parser = require("body-parser")
const jwt = require("express-jwt")
// const passport = require("passport")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
// const auth = require("./config/auth.js")

const User = require("./db/models.js").User
const Group = require("./db/models.js").Group
const Message = require("./db/models.js").Message

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(cookie('mysecretboxofsecretdom'))
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

app.use(session({
  secret: 'mysecretboxofsecretdom',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// var auth = function(req,res,next){
//
// })

// const authCheck = jwt({
//   secret: auth.secret,
//   audience: auth.audience
// })

app.get('/api', function(req, res){
  if (req.session.user == undefined){
    console.log("user not in session yet")
  } else {
    console.log("user in session: " + req.session.user)
  }
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
  console.log(req.session)
  console.log("email set to: " + req.body.email)
  req.session.user = req.body.email
  req.session.save()
  console.log("session value set: " + req.session.user)

  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err){
      console.log(err)
    }
    // res.json(user)
    console.log(user)
  })
})

// app.get("/api/profile", passport.authenticate('jwt', { session: false }), function(req, res) {
//   // res.send('It worked! User id is: ' + req.user._id + '.');
//   res.json(req.user)
// });

app.get("/api/profile", function(req,res){
  // console.log("session value is: " + req.session.email)
  User.findOne({email: "spongebob@email.com"}).populate('groups').exec(function(err, user){
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
      users: [],
      messages: []
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
  var popQuery = [{path: 'creator', model: 'User'}, {path: 'users', model: 'User'}, {path: 'messages', model: 'Message'}]
  Group.findOne({_id: req.params.id}).populate(popQuery).exec(function(err, group){
    res.json({
      creator: group.creator,
      members: group.users,
      messages: group.messages
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
