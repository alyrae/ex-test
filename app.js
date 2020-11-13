const express = require('express')
const chalk = require('chalk')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
const winston = require('winston')
const expressWinston = require('express-winston')
const mysql = require('mysql')

const route = require('./route')
const config = require('./config')
// require('./mongodb')

const app = express()

app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'ejs')

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wwwmysql123',
  database: 'test',
})
  
connect.connect()


// app.use(session({
//   secret: 'alyrae',
//   resave: false,
//   saveUninitialized: true,
//   name: 'sid',
//   rolling: true,
//   cookie: {
//     maxAge: 1000 * 60 * 5,
//     secure: false    
//   },
//   store: new MongoStore({
//     url: 'mongodb://localhost:27017/test'
//   })
// }))

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info'
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error'
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.use(bodyParser.json())

route(app)

app.listen(config.port, () => {
  console.log(chalk.blue(`http://127.0.0.1:${config.port}`))
})
