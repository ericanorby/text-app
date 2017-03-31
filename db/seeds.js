const User = require("./models.js").User

User.remove({}, err => {
  if (err) {
    console.log(err)
  }
})

var spongebob = User.create({
  firstname: "Spongebob",
  lastname: "Squarepants",
  phone: "1234567891"
})

var squidward = User.create({
  firstname: "Squidward",
  lastname: "Tentacles",
  phone: "0987654321"
})

var patrick = User.create({
  firstname: "Patrick",
  lastname: "Star",
  phone: "342785617"
})

var sandy = User.create({
  firstname: "Sandy",
  lastname: "Cheeks",
  phone: "8267351674"
})
