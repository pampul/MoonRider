express = require("express")

app = express()

app.use (req, res, next) ->
  if req.headers.origin
    res.header "Access-Control-Allow-Origin", "*"
    res.header "Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization"
    res.header "Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE"
    return res.send(200)  if req.method is "OPTIONS"
  next()
  return


app.get "/", (req, res) ->
  res.send "Hello world"
  return

app.get "/data", (req, res) ->
  res.send "Message received"
  return

## Post data threw url
app.post "/data", (req, res) ->
  res.send "Message received"
  return

## Page to display the stats
app.get "/stats/:site", (req, res) ->
  res.send "Get data for website : " + req.params.site
  return

## Launching app
app.listen 8888