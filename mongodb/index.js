const mongoose = require('mongoose')
const chalk = require('chalk')
require('./models/user')

mongoose.connect('mongodb://localhost/test')

let db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
  console.log(chalk.blue('mongodb connected'))
  console.log()
})
