express = require("express")
path = require('path')

# Load configurations
config = require('./config/config')

app = express()

# Express setup and settings
require('./config/express') app

# Bootstrap routes
require('./config/routes') app

# Start the app by listening on <port>
port = config.port
app.listen port
console.log "MoonRider App started on port " + port