'use strict'

const Hapi = require('hapi')
const Boom = require('boom')
const mongoose = require('mongoose')
const glob = require('glob')
const path = require('path')
const secret = require('./config')

const server = new Hapi.Server()
server.connection({
  port: 3000,
  routes: {
    cors: true
  }
})

const dbUrl  = 'mongodb://localhost:27017/hapi-app'

server.register(require('hapi-auth-jwt'), (err) => {
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: secret,
    verifyOptions: {
      algorithms: [ 'HS256' ]
    }
  })

  glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(path.join(__dirname, file))
    server.route(route)
  })

  server.start((err) => {
    if (err) throw error

    mongoose.connect(dbUrl, {}, (err) => {
      if (err) throw err
    })
  })

})
