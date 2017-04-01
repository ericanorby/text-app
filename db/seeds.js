const User = require("./models.js").User

User.remove({}, err => {
  if (err) {
    console.log(err)
  }
})

var spongebob = User.create({
  email: "spongebob@email.com",
  password: "gary",
  firstname: "Spongebob",
  lastname: "Squarepants",
  phone: "1234567891"
})

var squidward = User.create({
  email: "squidward@email.com",
  password: "clarinet",
  firstname: "Squidward",
  lastname: "Tentacles",
  phone: "0987654321"
})

var patrick = User.create({
  email: "patrick@email.com",
  password: "rock",
  firstname: "Patrick",
  lastname: "Star",
  phone: "342785617"
})

var sandy = User.create({
  email: "sandy@email.com",
  password: "texas",
  firstname: "Sandy",
  lastname: "Cheeks",
  phone: "8267351674"
})
