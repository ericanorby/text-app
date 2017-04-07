const mongoose = require("./connection.js")
const bcrypt = require("bcrypt-nodejs")
var jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String,
    username: String,
    groups: [{type: mongoose.Schema.Types.ObjectId, ref: "Group"}]
  }
)

const MessageSchema = new mongoose.Schema(
  {
    content: String,
    datetime: {type: Date}
  }
)

const GroupSchema = new mongoose.Schema(
  {
    title: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    messages: [MessageSchema]
  }
)

//generate a salt hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//check is password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

//assign a token
UserSchema.methods.generateJwt = function() {
  var expiry = new Date()
  expiry.setDate(expiry.getDate() + 7)

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime()/1000)
  }, "secretcodeyay")
}

const User = mongoose.model("User", UserSchema)
const Group = mongoose.model("Group", GroupSchema)
const Message = mongoose.model("Message", MessageSchema)

module.exports = {
  User,
  Group,
  Message
}
