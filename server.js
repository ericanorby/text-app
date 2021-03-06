"use strict"

const express = require("express")
const app = express()
const mongoose = require("./db/connection.js")
const port = process.env.API_PORT || 3001

const parser = require("body-parser")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
const auth = require("./config/auth.js")
require("./config/passport")(passport)

//import models
const User = require("./db/models.js").User
const Group = require("./db/models.js").Group
const Message = require("./db/models.js").Message

//Twilio
var accountSid = 'AC777e2ca4d5336491ef519df453e2230f';
var authToken = auth.token;
var client = require('twilio')(accountSid, authToken);


app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

app.use(session({
  secret: 'secretyay',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.post('/api/signup',
  passport.authenticate("local-signup"), function(req, res){
    console.log(req.user)
  }
)

app.post('/api/login',
  passport.authenticate("local-login"), function(req, res){
    console.log(req.user)
  }
)

// app.get("/api/profile", function(req,res){
//   User.findOne({email: "patrick@email.com"}).populate('groups').exec(function(err, user){
//     res.json({
//       user: user,
//       groups: user.groups
//     })
//   })
// })

app.get("/api/profile", function(req,res){
  User.findOne({email: "ericanorby@gmail.com"}).populate('groups').exec(function(err, user){
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
      res.json(group)
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

app.delete("/api/groups/:id", function(req, res){
  Group.remove({_id: req.params.id}, function(err){
    if (err) {
      console.log(err)
    } else {
      console.log("deleted successfully")
    }
  })
})

app.post("/api/groups/:id/add", function(req,res){
  Group.findOne({_id: req.params.id}).then(function(group){
    var proceed = true
    if (group.users.length >= 9) {
      proceed = false
    }
    //check to see if user is already a member
    if (group.creator == req.body.user._id){
      proceed = false
      res.json({success: false, message: "User is already a member."})
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

app.post("/api/groups/:id/messages", function(req, res){
  Group.findOne({_id: req.params.id}).then(function(group){
    if (group.messages.length >= 6) {
      return;
    }
    else {
      var newMessage = new Message({
        content: req.body.content,
        datetime: req.body.datetime
      })
      newMessage.save(function(err, message){
        if (err) {
          console.log(err)
        }
        res.json(message)
        group.messages.push(message)
        group.save(function(err){
          if (err) {
            console.log(err)
          }
        })
      })
    }
  })
})

function cycleMessages(){
  var popQuery = [{path: 'creator', model: 'User'}, {path: 'users', model: 'User'}]
  Group.find({}).populate(popQuery).then(function(groups){
    groups.forEach((group) => {
      group.messages.forEach((msg) => {
        var date = new Date()
        if (date.getFullYear() === msg.datetime.getFullYear() &&
            date.getUTCMonth() === msg.datetime.getUTCMonth() &&
            date.getUTCDate() === msg.datetime.getUTCDate() &&
            date.getHours() === msg.datetime.getUTCHours() &&
            date.getUTCMinutes() === msg.datetime.getUTCMinutes()
            ) {
          newTwilioMsg(group, msg)
        }
      })
    })
  })
}



function newTwilioMsg(group, msg){
  client.messages.create({
    to: "+1" + group.creator.phone,
    from: "+15083068079",
    body: msg.content
  }, function(err, message) {
    console.log(message.sid);
  })
  group.users.forEach((user) => {
    client.messages.create({
      to: "+1" + user.phone,
      from: "+15083068079",
      body: msg.content
    }, function(err, message) {
      console.log(message.sid);
    })
  })
}

setInterval(cycleMessages, 60000)

app.delete("/api/groups/:id/messages", function(req, res){
  Group.findOneAndUpdate({_id: req.params.id},
    {
      $pull: {
        messages: {_id: req.body.id}
      }
    },
    function(err){
      if (err) {
        console.log(err)
      }
      Message.remove({_id: req.body.id}, function(err){
        if (err) {
          console.log(err)
        } else {
          console.log("deleted successfully")
        }
      })
    }
  )
})


app.post("/api/users/search", function(req, res){
  User.findOne({phone: req.body.input}).then(function(user){
    res.json(user)
  })
})

app.listen(port, function(){
  console.log("Port works yooooo")
})
