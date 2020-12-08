const fetch = require('node-fetch');

const apiKey = 'd7b2c5d04324484a8e93c24bbf47be67';
const forecastEndpoint = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const historicalForecastEndpoint = 'https://api.weatherbit.io/v2.0/history/daily?';

/**
 * Get weather forecast from Weatherbit API for a given latitude and longitude
 * @param lat
 * @param lng
 * @param date
 * @returns {Promise<{maxTemp: *, description: *, minTemp: *} | void>}
 */
function getWeatherForecast(lat, lng, date) {

   const params = new URLSearchParams({
      lat: lat,
      lon: lng,
      key: apiKey
   });

   return fetch(forecastEndpoint + params)
      .then(response => response.json())
      .then((body) => {
         for (const day of body['data']) {
            if (day['valid_date'] === date) {
               return {
                  description: day['weather']['description'],
                  minTemp: day['min_temp'],
                  maxTemp: day['max_temp']
               };
            }
         }
      })
      .catch((err) => {
         console.log(err);
         throw err;
      });
}

function getPredictedForecast(lat, lng, date) {
   const startDate = new Date(date);
   startDate.setFullYear(startDate.getFullYear()-1);

   const nextDate = new Date(startDate);
   nextDate.setDate(nextDate.getDate() + 1);

   const params = new URLSearchParams({
      lat: lat,
      lon: lng,
      // eslint-disable-next-line camelcase
      start_date: startDate.toISOString().substr(0, 10),
      // eslint-disable-next-line camelcase
      end_date: nextDate.toISOString().substr(0, 10),
      key: apiKey
   });

   return fetch(historicalForecastEndpoint + params)
      .then(response => response.json())
      .then((body) => {
         return {
            minTemp: body['data'][0]['min_temp'],
            maxTemp: body['data'][0]['max_temp']
         };
      })
      .catch((err) => {
         console.log(err);
         throw err;
      });
}

module.exports = {
   getWeatherForecast,
   getPredictedForecast
};