###
  Index Controller
###
path = require('path')
fs = require('fs')
config = require("./../config/config")


exports.index = (req, res) ->
  webSitePath = config.root + '/data/' + req.params.site

  if fs.existsSync(webSitePath)
    res.send 'Data found'
    #res.render('index', {"title": "Ninja Stack"});
  else
    res.send 'No data founded.'
  return