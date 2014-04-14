var app, express, fs, mkdirp, pad, path;

express = require("express");

fs = require('fs');

path = require('path');

mkdirp = require('mkdirp');

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

app.post("/data", function(req, res) {
  var formData;
  formData = '';
  req.on("data", function(data) {
    formData += data;
  });
  req.on("end", function() {
    var clientData, currentHourMin, currentHourMinPlus, currentPath, date, fullPath, webSiteUrl;
    clientData = JSON.parse(formData);
    date = new Date();
    webSiteUrl = clientData.webSite.host;
    webSiteUrl = webSiteUrl.replace('/', '-');
    webSiteUrl = webSiteUrl.toLowerCase();
    currentPath = path.resolve('server/data/' + webSiteUrl);
    fullPath = currentPath + '/' + date.getFullYear() + '/' + pad(date.getMonth() + 1) + '/' + pad(date.getDate());
    currentHourMin = pad(date.getHours()) + '-' + pad(date.getMinutes());
    currentHourMinPlus = pad(date.getHours() - 1) + '-' + pad(date.getMinutes()) + '.json';
    return mkdirp(fullPath, function(err) {
      var file, files, maxFile, _i, _len;
      if (err) {
        return console.error(err);
      } else {
        files = fs.readdirSync(fullPath);
        if (files.length < 5) {
          maxFile = '00-00.json';
          for (_i = 0, _len = files.length; _i < _len; _i++) {
            file = files[_i];
            if (maxFile < file) {
              maxFile = file;
            }
          }
          if (currentHourMinPlus > maxFile) {
            return fs.writeFile(fullPath + '/' + currentHourMin + '.json', JSON.stringify(clientData, null, 2), function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("JSON saved to " + fullPath + '/' + currentHourMin + '.json');
                res.send('Data saved.');
              }
            });
          }
        }
      }
    });
  });
});

app.get("/stats/:site", function(req, res) {
  var webSitePath;
  webSitePath = path.resolve('server/data/' + req.params.site);
  if (fs.existsSync(webSitePath)) {
    res.send('Founded');
  } else {
    res.send('No data founded.');
  }
});

app.listen(8888);

pad = function(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
};
