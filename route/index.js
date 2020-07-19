const indexRoute = require('./indexRoute')
const loginRoute = require('./loginRoute')
const editRoute = require('./editRoute')
const registerRoute = require('./registerRoute')
const checkLogin = require('../middlewares/checkLogin')

module.exports = function (app) {
  app.get('/', function(req, res) {
    res.redirect('/home')
  })
  app.use('/home', indexRoute)
  app.use('/login', loginRoute)
  app.use('/edit', checkLogin, editRoute)
  app.use('/register', registerRoute)
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}