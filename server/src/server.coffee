express = require("express")

app = express()
app.get "/", (req, res) ->
  res.send "Hello world"
  return

## Post data threw url
app.post "/data", (req, res) ->


## Page to display the stats
app.get "/stats/:site", (req, res) ->
  res.send "Get data for website : " + req.params.site
  return

## Launching app
app.listen 3000