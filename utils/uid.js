const User = require('../mongodb/models/user')

module.exports = function getUid(cb) {
  function loop() {
    let uid = Math.ceil(Math.random() * 1000000)
    User.findOne({uid}, function(err, doc) {
      if (!doc) {        
        cb(uid)
      } else {        
        loop()
      }
    })
  }
  loop()
}