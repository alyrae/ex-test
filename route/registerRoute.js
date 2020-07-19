const router = require('express').Router()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const User = require('../mongodb/models/user')
const encrypt = require('../utils/encrypt').encrypt
const getUid = require('../utils/uid')

router.get('/', function(req, res) {
  res.render('register', {
    title: '注册',
  })
})

router.post('/', upload.single('file'), function (req, res) {
  let {file, body: {name, password}} = req
  let avatar = file && file.filename
  if (!avatar || !name || !password) {
    res.json({
      errcode: 2000,
      detail: '信息不完整'
    })
  } else {    
    User.findOne(
      {
        name: name
      },
      function(err, find_res) {
        if (find_res) {
          res.json({
            errcode: 2001,
            detail: '该用户名已存在'
          })
        } else {
          getUid(function (uid) {
            let doc = User({
              uid,
              name,
              password: encrypt(password),
              avatar
            })
            doc.save()
            res.json({
              errcode: 0,
              detail: 'success',
            })
          })
        }
      }
    )  
  }
})

module.exports = router