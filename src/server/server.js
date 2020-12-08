const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const {getCityInformation} = require('../client/js/geoProvider');
dotenv.config();

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
   // res.sendFile('dist/index.html')
   res.sendFile(path.resolve('dist/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
   console.log('Example app listening on port 8081!');
});

const isNullOrBlank = (str) => {
   return !(str && str.trim());
};

const addCorsHeaders = (res) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
};

// app.get('/get-city-info', (req,res) => {
//    let cityName = req.query.city;
//    if (isNullOrBlank(cityName)) {
//       res.status(400);
//       res.send({error: 'city is required'});
//    } else {
//       addCorsHeaders(res);
//       getCityInformation(cityName)
//          .then((body) => {
//             if (body) {
//                res.send(body);
//             } else {
//                res.status(404);
//                res.send({error: `Can not find city with name ${cityName}`});
//             }
//          })
//          .catch(err => res.send(err));
//    }
// });
