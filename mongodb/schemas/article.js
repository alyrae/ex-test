const mongoose = require('mongoose')

module.exports = mongoose.Schema({
  title: String,
  content: String,
  author: Number,
  id: Number
})