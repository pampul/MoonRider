###
  Module dependencies.
###
path = require("path")
rootPath = path.normalize __dirname + "/../.."
srcPath = path.normalize __dirname

# Defaults that you can access when you require this config.
module.exports =
  root: rootPath
  srcPath: srcPath
  port: 8888