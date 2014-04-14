var app, express;

express = require("express");

app = express();

app.use(function(req, res, next) {
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    if (req.method === "OPTIONS") {
      return res.send(200);
    }
  }
  next();
});

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/data", function(req, res) {
  res.send("Message received");
});

app.post("/data", function(req, res) {
  res.send("Message received");
});

app.get("/stats/:site", function(req, res) {
  res.send("Get data for website : " + req.params.site);
});

app.listen(8888);
