const router = require('express').Router()
const Article = require('../mongodb/models/article')

router.get('/', async function(req, res) {
  console.log('get home')
  try {
    let list = await Article.find({})
    res.render('home', {
      title: '首页',
      list
    })
  } catch(err) {
    console.log(err)
  }
})

module.exports = router