###
  Module dependencies.
###
path = require("path")
rootPath = path.resolve 'server/'

# Defaults that you can access when you require this config.
module.exports =
  root: rootPath
  port: 8888