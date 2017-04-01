const mongoose = require("./connection.js")
const bcrypt = require("bcrypt-nodejs")

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: String
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

module.exports = {
  User
}
