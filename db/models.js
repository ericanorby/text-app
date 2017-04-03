const mongoose = require("./connection.js")
const bcrypt = require("bcrypt-nodejs")

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

const GroupSchema = new mongoose.Schema(
  {
    title: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message"}]
  }
)

const MessageSchema = new mongoose.Schema(
  {
    content: String
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

const User = mongoose.model("User", UserSchema)
const Group = mongoose.model("Group", GroupSchema)
const Message = mongoose.model("Message", MessageSchema)

module.exports = {
  User,
  Group,
  Message
}
