const router = require('express').Router()
const articleModel = require('../mongodb/models/article')

router.get('/', function(req, res) {
  res.render('edit', {
    title: '编辑',    
  })
})

router.post('/', function(req, res) {
  let {title, content} = req.body
  new articleModel({
    title,
    content,
    author: 1,
    id: 1
  }).save(function (err, doc) {
    if (err) {
      console.error(err)
    } else {
      res.status(200).json({
        errcode: 0,
        detail: 'success',
        data: {}
      })
    }
  })
})

module.exports = router