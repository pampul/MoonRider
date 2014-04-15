###
  Module dependencies.
###

express = require("express")
config = require("./config")

module.exports = (app) ->
  app.use (req, res, next) ->
    if req.headers.origin
      res.header "Access-Control-Allow-Origin", "*"
      res.header "Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization"
      res.header "Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE"
      return res.send(200)  if req.method is "OPTIONS"
    next()
    return