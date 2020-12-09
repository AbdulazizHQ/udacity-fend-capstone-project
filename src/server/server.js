// Require Express to run server and routes
const express = require('express');
const path = require('path');

// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

let key = 0;
const vacations = {};

app.post('/upload', (req, res) => {
   vacations[`${key}`] = req.body;
   addCorsHeaders(res);
   res.status(200).send({key: key++});
});

app.get('/last', (req, res) => {
   addCorsHeaders(res);
   res.send(JSON.stringify(vacations[`${key-1}`]));
});

app.get('/', function (req, res) {
   // res.sendFile('dist/index.html')
   res.sendFile(path.resolve('dist/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
   console.log('Example app listening on port 8081!');
});

const addCorsHeaders = (res) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
};
