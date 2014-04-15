express = require("express")
path = require('path')

# Load configurations
config = require(__dirname+'/config/config')

app = express()

# Express setup and settings
require(config.srcPath+"/express") app

# Bootstrap routes
require(config.srcPath+"/routes") app

# Start the app by listening on <port>
port = config.port
app.listen port
console.log "MoonRider App started on port " + port