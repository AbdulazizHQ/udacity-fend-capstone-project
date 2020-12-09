const fetch = require('node-fetch');

const apiKey = '19446157-f96f8a94f957dd99a86c54ce3';
const apiEndpoint = 'https://pixabay.com/api/?';

/**
 * Query pixbay.com API
 * @param query
 * @returns {Promise<* | string | void>}
 */
function getImage(query) {

   const params = new URLSearchParams({
      key: apiKey,
      q: query,
      // eslint-disable-next-line camelcase
      image_type: 'photo',
      orientation: 'horizontal',
      category: 'buildings'
   });

   return fetch(apiEndpoint + params)
      .then(response => response.json())
      .then((body) => {
         if (body['totalHits'] > 0) {
            return body['hits'][0]['webformatURL'];
         } else {
            return null;
         }
      })
      .catch((err) => {
         console.log(err);
         throw err;
      });
}

/**
 * Get the city image from pixbay.com API
 * @param cityName
 * @param countryName
 * @returns {Promise<* | string | void>}
 */
function getCityImage(cityName, countryName) {
   return getImage(cityName)
      .then((response) => {
         if (response) {
            return response;
         } else {
            return getImage(countryName)
               .then((response) => {
                  if (response) {
                     return response;
                  } else {
                     return 'https://pixabay.com/get/57e8d1414852a914f1dc846096293e7a1139dfe0544c704f75287fd09e4fc35c_640.jpg';
                  }
               });
         }
      })
      .catch((err) => {
         console.log(err);
         throw err;
      });
}

module.exports = {
   getCityImage
};