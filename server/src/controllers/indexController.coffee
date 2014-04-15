###
  Index Controller
###
path = require('path')
fs = require('fs')


exports.index = (req, res) ->
  webSitePath = path.resolve 'server/data/' + req.params.site

  if fs.existsSync(webSitePath)
    res.send 'Founded'
  else
    res.send 'No data founded.'
  return