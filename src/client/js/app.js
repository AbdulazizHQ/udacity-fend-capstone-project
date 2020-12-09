const {calculateLength} = require('./helper');
const {getCityInformation} = require('./geoProvider');
const {getWeather} = require('./weatherProvider');
const {getCityImage} = require('./imageProvider');
const fetch = require('node-fetch');

const vacationDestinationField = document.getElementById('vacation-destination');
const vacationStartDateField = document.getElementById('vacation-start-date');
const vacationEntDateField = document.getElementById('vacation-end-date');
const vacationDestinationImage = document.getElementById('destination-image-container');
const vacationLengthField = document.getElementById('vacation-length');
const destinationWeatherField = document.getElementById('destination-weather');

const form = {
   startDay: '',
   endDay: '',
   destination: ''
};

/**
 * Pull date from remote APIs and show them on window
 * @param event
 */
function handleSubmit(event) {
   event.preventDefault();
   form.destination = vacationDestinationField.value;
   form.startDay = vacationStartDateField.value;
   form.endDay = vacationEntDateField.value;


   getCityInformation(form.destination)
      .then(cityInformation => {
         getWeather(cityInformation.latitude, cityInformation.longitude, form.startDay)
            .then(weather => {
               getCityImage(cityInformation.cityName, cityInformation.country)
                  .then(url => {
                     fetch('http://localhost:8081/upload', {
                        method: 'post',
                        headers: {
                           'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                           cityInformation: cityInformation,
                           startDay: form.startDay,
                           endDay: form.endDay,
                           weather: weather,
                           image: url
                        }),
                     })
                        .then(response => {
                           if(response.ok) {
                              fetch('http://localhost:8081/last')
                                 .then(response => response.json())
                                 .then(body => updateView(body));
                           } else {
                              console.log(`Error ${response.error()}`);
                           }
                        });
                  });
            })
            .catch(err => console.log(err));
      });
}

/**
 * Update the view new information.
 * @param body
 */
function updateView(body) {
   showWeather(body.cityInformation.cityName, body.weather);
   showVacationLength(body.cityInformation.cityName, body.startDay, body.endDay);
   vacationDestinationImage.innerHTML =
      `<img id="destination-image" src="${body.image}" alt="${body.cityInformation.cityName}"/>`;
}

/**
 * Create a message for the weather.
 * @param destination
 * @param weather
 */
function showWeather(destination, weather) {
   if (weather['description']) {
      destinationWeatherField.innerHTML =
         `${destination}'s weather: ${weather['description']}, min: ${weather['minTemp']}, max: ${weather['maxTemp']}`;
   } else {
      destinationWeatherField.innerHTML =
         `${destination}'s predicted temperature: min: ${weather['minTemp']}, max: ${weather['maxTemp']}`;
   }
}

/**
 * Show a message for the vacation length.
 * @param cityName
 * @param startDate
 * @param endDate
 */
function showVacationLength(cityName, startDate, endDate) {
   vacationLengthField.innerHTML = `Your ${cityName}'s vacation is ${calculateLength(startDate, endDate)} days`;
}


module.exports = {
   handleSubmit,
};