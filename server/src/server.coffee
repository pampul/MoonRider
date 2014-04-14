express = require("express")
fs = require('fs')
path = require('path')
mkdirp = require('mkdirp')

app = express()

app.use (req, res, next) ->
  if req.headers.origin
    res.header "Access-Control-Allow-Origin", "*"
    res.header "Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization"
    res.header "Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE"
    return res.send(200)  if req.method is "OPTIONS"
  next()
  return

## Post data threw url
app.post "/data", (req, res) ->
  formData = ''
  req.on "data", (data) ->
    formData += data;
    return

  req.on "end", ->
    clientData = JSON.parse(formData);
    date = new Date();
    webSiteUrl = clientData.webSite.host
    webSiteUrl = webSiteUrl.replace('/', '-')
    webSiteUrl = webSiteUrl.toLowerCase()
    currentPath = path.resolve 'server/data/' + webSiteUrl
    fullPath = currentPath + '/' + date.getFullYear() + '/' + pad(date.getMonth() + 1) + '/' + pad(date.getDate())
    currentHourMin = pad(date.getHours()) + '-' + pad(date.getMinutes())
    currentHourMinPlus = pad(date.getHours() - 1) + '-' + pad(date.getMinutes()) + '.json'

    mkdirp fullPath, (err) ->
      if err
        console.error err
      else
        files = fs.readdirSync(fullPath)
        # Maximum stats per day not reached yet
        if files.length < 5
          maxFile = '00-00.json'

          for file in files
            if maxFile < file
              maxFile = file

          if currentHourMinPlus > maxFile
            # We can wrote a new stats file
            fs.writeFile fullPath+'/'+currentHourMin+'.json', JSON.stringify(clientData, null, 2), (err) ->
              if err
                console.log err
              else
                console.log "JSON saved to " + fullPath+'/'+currentHourMin+'.json'
                res.send 'Data saved.'
              return


  return

## Page to display the stats
app.get "/stats/:site", (req, res) ->
  webSitePath = path.resolve 'server/data/' + req.params.site

  if fs.existsSync(webSitePath)
    res.send 'Founded'
  else
    res.send 'No data founded.'
  return

## Launching app
app.listen 8888


## usefull func
pad = (n) ->
  (if n < 10 then "0" + n else n)