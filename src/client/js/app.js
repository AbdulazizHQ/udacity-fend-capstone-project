const {calculateLength} = require('./helper');
const {getCityInformation} = require('./geoProvider');
const {getWeather} = require('./weatherProvider');
const {getCityImage} = require('./imageProvider');

const vacationDestinationField = document.getElementById('vacation-destination');
const vacationStartDateField = document.getElementById('vacation-start-date');
const vacationEntDateField = document.getElementById('vacation-end-date');
const vacationDestinationImage = document.getElementById('destination-image');
const vacationLengthField = document.getElementById('vacation-length');
const destinationWeatherField = document.getElementById('destination-weather');

const form = {
   startDay: '',
   endDay: '',
   destination: ''
};

function handleSubmit(event) {
   event.preventDefault();
   form.destination = vacationDestinationField.value;
   form.startDay = vacationStartDateField.value;
   form.endDay = vacationEntDateField.value;

   getCityInformation(form.destination)
      .then(cityInformation => {
         showVacationLength(cityInformation.cityName, form.startDay, form.endDay);
         getWeather(cityInformation.latitude, cityInformation.longitude, form.startDay)
            .then(weather => {
               showWeather(cityInformation.cityName, weather);
            });
         getCityImage(cityInformation.cityName, cityInformation.cityName)
            .then(url => {
               vacationDestinationImage.setAttribute('src', url);
            });
      })
      .catch(err => {
         console.log(err);
      });

}

function showWeather(destination, weather) {
   if (weather['description']) {
      destinationWeatherField.innerHTML =
         `${destination}'s weather: ${weather['description']}, min: ${weather['minTemp']}, max: ${weather['maxTemp']}`;
   } else {
      destinationWeatherField.innerHTML =
         `${destination}'s predicted temperature: min: ${weather['minTemp']}, max: ${weather['maxTemp']}`;
   }
}

function showVacationLength(cityName, startDate, endDate) {
   vacationLengthField.innerHTML = `Your ${cityName}'s vacation is ${calculateLength(startDate, endDate)} days`;
}

module.exports = {
   handleSubmit,
};