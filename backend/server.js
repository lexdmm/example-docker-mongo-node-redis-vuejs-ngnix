// get dependencies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./routes')(app);

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);

// Connecting to the database
mongoose.connect(config.url, { 
    useNewUrlParser: true
}).then(() => {
    console.log("Mongo Conection OK!");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "Test OK"});
});

// listen on port 3000
app.listen(config.serverport, () => {
    console.log("Listening on Port 3000");
});