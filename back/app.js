const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")

// App
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../front/')))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
  });

// Server
const server = app.listen(2696, () => {
    console.log("app running on port." + server.address().port)
})

// Routing
require('./routes/routes')(app)
