const sha256 = require('crypto-js/sha256')
const md5 = require('crypto-js/md5')

const salt = 'alyrae'

function encrypt(content) {
  let raw = sha256(salt + content).toString()
  return md5(raw).toString()
}

function validate(ciphertext, content) {
  return encrypt(content) === ciphertext
}

module.exports = {
  encrypt,
  validate
}