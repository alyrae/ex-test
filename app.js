const express = require('express')
const chalk = require('chalk')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const route = require('./route')
const config = require('./config')
require('./mongodb')

const app = express()

app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'ejs')

app.use(session({
  secret: 'alyrae',
  resave: false,
  saveUninitialized: true,
  name: 'sid',
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: false    
  },
  store: new MongoStore({
    url: 'mongodb://localhost:27017/test'
  })
}))


app.use(bodyParser.json())

route(app)

app.listen(config.port, () => {
  console.log(chalk.blue(`http://127.0.0.1:${config.port}`))
})
