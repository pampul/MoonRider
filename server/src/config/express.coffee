###
  Module dependencies.
###

express = require("express")
config = require("./config")
swig = require('swig')

module.exports = (app) ->

  #Set views path, template engine and default layout.
  app.set "view engine", "html"
  app.engine "html", swig.renderFile
  app.set "views", config.root + '/../app/public'
  app.use '/assets', express.static config.root + '/../app/public/assets'

  app.use (req, res, next) ->
    if req.headers.origin
      res.header "Access-Control-Allow-Origin", "*"
      res.header "Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization"
      res.header "Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE"
      return res.send(200)  if req.method is "OPTIONS"
    next()
    return