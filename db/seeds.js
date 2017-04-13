const User = require("./models.js").User
const Group = require("./models.js").Group
const Message = require("./models.js").Message

User.remove({}, err => {
  if (err) {
    console.log(err)
  }
})

Group.remove({}, err => {
  if (err) {
    console.log(err)
  }
})

Message.remove({}, err => {
  if (err) {
    console.log(err)
  }
})


var spongebob = new User({
  email: "spongebob@email.com",
  password: "gary",
  firstname: "Spongebob",
  lastname: "Squarepants",
  phone: "1234567891",
  groups: []
})

var squidward = new User({
  email: "squidward@email.com",
  password: "clarinet",
  firstname: "Squidward",
  lastname: "Tentacles",
  phone: "0987654321",
  groups: []
})

var patrick = new User({
  email: "patrick@email.com",
  password: "rock",
  firstname: "Patrick",
  lastname: "Star",
  phone: "342785617",
  groups: []
})

var sandy = new User({
  email: "sandy@email.com",
  password: "texas",
  firstname: "Sandy",
  lastname: "Cheeks",
  phone: "8267351674",
  groups: []
})

spongebob.save()
patrick.save()
squidward.save()
sandy.save()
//
// var group1 = new Group({
//   title: "Spongebob's awesome group",
//   creator: spongebob._id,
//   users: [squidward._id, sandy._id],
//   messages: []
// })
//
// var group2 = new Group({
//   title: "Patrick's group is better",
//   creator: patrick._id,
//   users: [sandy._id],
//   messages: []
// })
//
// group1.save(function(err){
//   if (err){
//     console.log(err)
//   }
//   else {
//     console.log(group1)
//   }
// })
//
// group2.save(function(err){
//   if (err){
//     console.log(err)
//   }
//   else {
//     console.log(group2)
//   }
// })
//
// spongebob.groups.push(group1)
// spongebob.save().then((user) =>{
//   console.log(user)
// })
