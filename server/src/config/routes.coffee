###
  Module dependencies.
###
module.exports = (app) ->

  # Require Index of all non api and model routes.
  postController = require("../controllers/postController")
  indexController = require("../controllers/indexController")

  # Post data
  app.post "/data", postController.postData

  # Get urls
  app.get "/stats/:site", indexController.index

  return