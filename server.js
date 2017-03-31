"use strict"

const express = require("express")
const mongoose = require("./db/connection.js")
const parser = require("body-parser")

const User = require("./db/models.js").User

var app = express()

var port = process.env.API_PORT || 3001

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// app.use(function(req, res, next) {
//  res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
//  res.setHeader(‘Access-Control-Allow-Credentials’, ‘true’);
//  res.setHeader(‘Access-Control-Allow-Methods’, ‘GET,HEAD,OPTIONS,POST,PUT,DELETE’);
//  res.setHeader(‘Access-Control-Allow-Headers’, ‘Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers’);
//  res.setHeader(‘Cache-Control’, ‘no-cache’);
//  next();
// })

app.get("/api", function(req, res){
  User.find({}).then((users) => {
    res.json(users)
  })
})


app.listen(port, function(){
  console.log("Port works yooooo")
})
