// Create express instance
var express = require("express");
var db = require("./db/db-connection")
var bodyParser = require('body-parser')
var app = express();
// create http instance
var http = require("http").createServer(app);
require('dotenv').config()
//set the template engine ejs
app.set('view engine', 'ejs')
// Intiate to connect mongo DB
db.getDbConnected();
//middlewares
app.use(express.static('public'))
// Parses the text as url encoded data 
app.use(bodyParser.urlencoded({ extended: true }));
// Parses the text as json 
app.use(bodyParser.json());

// Socket instance for real time communication
global._io = require("socket.io")(http);
// Call to socket service
require("./services/socket-service");
// setup all routes
require("./src/routes")(app)
let port = process.env.PORT || 3132;
http.listen(port, function () {
    console.log("Server started at port:" + port);
})

