'use strict'

/**
 * Module dependencies
 */

const bcrypt = require('bcryptjs')
const Boom = require('boom')
const User = require('../model/User')
const checkUserSchema = require('../schemas/checkUser')
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser

module.exports = {
  method: 'POST',
  path: '/api/users/check',
  config: {
    auth: false,
    pre: [
      {
        method: verifyUniqueUser,
        assign: 'user'
      }
    ],
    handler: (request, reply) {
      res(req.pre.user)
    },
    validate: {
      payload: checkUserSchema
    }
  }
}
