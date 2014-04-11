var app, express;

express = require("express");

app = express();

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.post("/data", function(req, res) {});

app.get("/stats/:site", function(req, res) {
  res.send("Get data for website : " + req.params.site);
});

app.listen(3000);
