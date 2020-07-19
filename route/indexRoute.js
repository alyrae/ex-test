const router = require('express').Router()
const Article = require('../mongodb/models/article')

router.get('/', function(req, res) {
  Article.find({}, function(err, list) {
    res.render('home', {
      title: '首页',
      list
    })
  })
})

module.exports = router