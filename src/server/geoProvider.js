const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.GEONAMES_API_KEY;
const apiEndpoint = 'http://api.geonames.org/search?';

function getCityInformation(cityName) {

   const params = new URLSearchParams({
      username: apiKey,
      type: 'json',
      name: cityName
   });

   return fetch(apiEndpoint + params)
      .then(response => response.json())
      .then((body) => {
         if (body['totalResultsCount'] > 0) {
            return {
               cityName: body['geonames'][0]['name'],
               latitude: body['geonames'][0]['lat'],
               longitude: body['geonames'][0]['lng'],
               country: body['geonames'][0]['countryName']
            };
         } else {
            return null;
         }
      })
      .catch((err) => {
         console.log(err);
         throw err;
      });
}

module.exports = {
   getCityInformation
};