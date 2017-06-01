'use strict'

const jwt = require('jsonwebtoken')
const secret = require('../../../config')

function createToken(user) {
  let scopes;

  user.admin && (scopes = 'admin')
  return jwt.sign({
    id: user._id,
    username: user.username,
    scopes: scopes
  }, secret,
    {
        algorithm: 'HS256',
        expiresIn: '1h'
    })
  }

module.exports = createToken
