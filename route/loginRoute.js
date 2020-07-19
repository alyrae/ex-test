const router = require('express').Router()
const User = require('../mongodb/models/user')
const validate = require('../utils/encrypt').validate

router.get('/', function (req, res, next) {
  res.render('login', {
    title: '登录'
  })
})

router.post('/', function (req, res, next) {
  let {name, password} = req.body
  User.findOne(
    {
      name
    },
    function(err, doc) {   
      if (doc && validate(doc.password, password)) {        
        req.session.user = doc
        res.json({
          errcode: 0,
          detail: 'success'
        })
      } else {
        res.json({
          errcode: 1,
          detail: '姓名或密码错误'
        })
      }
    }
  )
})

module.exports = router