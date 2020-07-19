const mongoose = require('mongoose')

module.exports = mongoose.Schema({
  uid: Number,
  name: String,
  password: String,
  avatar: String,  
})