"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// enum for weather icons
var WeatherIcon;
(function (WeatherIcon) {
    WeatherIcon["01d"] = "sunny-icon.svg";
    WeatherIcon["01n"] = "moon-icon.svg";
    WeatherIcon["02d"] = "partly-cloudy-icon.svg";
    WeatherIcon["02n"] = "partly-cloudy-night-icon.svg";
    WeatherIcon["03d"] = "cloudy-icon.svg";
    WeatherIcon["03n"] = "cloudy-icon.svg";
    WeatherIcon["04d"] = "cloudy-icon.svg";
    WeatherIcon["04n"] = "cloudy-icon.svg";
    WeatherIcon["09d"] = "rainy-icon.svg";
    WeatherIcon["09n"] = "rainy-icon.svg";
    WeatherIcon["10d"] = "rainy-icon.svg";
    WeatherIcon["10n"] = "rainy-icon.svg";
    WeatherIcon["11d"] = "thunderstorm-icon.svg";
    WeatherIcon["11n"] = "thunderstorm-icon.svg";
    WeatherIcon["13d"] = "snow-icon.svg";
    WeatherIcon["13n"] = "snow-icon.svg";
    WeatherIcon["50d"] = "mist-icon.svg";
    WeatherIcon["50n"] = "mist-icon.svg";
})(WeatherIcon || (WeatherIcon = {}));
// global variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '34b8b0ad1c772a50e7652217be753ce1';
const UNITS = 'metric';
const CITY = 'Stockholm';
const CURRENT_URL = `${BASE_URL}weather?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`;
const FORECAST_URL = `${BASE_URL}forecast?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`;
// DOM elements
const currentWeatherBackground = document.getElementById('current-weather-background');
const currentWeather = document.getElementById('current-weather-top');
const currentWeatherInfo = document.getElementById('current-weather-info');
const forecastCard = document.getElementById('forecast-card');
const toggleForecastButton = document.getElementById('toggle-btn');
const buttonArrow = document.getElementById('arrow');
const buttonContainer = document.getElementById('button-container');
// fetch current weather data
const fetchCurrentWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(CURRENT_URL);
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        const data = yield response.json();
        // get sunrise and sunset time
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        // get weather icon
        const weatherIcon = WeatherIcon[data.weather[0].icon];
        // create weather object
        let currentWeather = {
            city: data.name,
            temperature: Math.ceil(data.main.temp),
            icon: `./assets/${weatherIcon}`,
            description: data.weather[0].description,
            sunrise: `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`,
            sunset: `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`
        };
        // display current weather
        displayCurrentWeather(currentWeather);
        // check if night and style accordingly
        isNight(data.sys.sunrise, data.sys.sunset) ?
            currentWeatherBackground.classList.add('night') :
            currentWeatherBackground.classList.remove('night');
    }
    catch (error) {
        console.error('Error:', error);
    }
});
// display current weather
const displayCurrentWeather = (weatherObject) => {
    currentWeather.innerHTML =
        `
    <p class='big-paragraph'>${weatherObject.temperature}<p class="celcius">°C</p></p>
    <div class='weather-icon-container'>
      <img class='weather-icon' src='${weatherObject.icon}' alt='weather-icon'>
    </div>
    `;
    currentWeatherInfo.innerHTML =
        `
    <p class='medium-paragraph'>${weatherObject.city}</p>
    <p class='small-paragraph'>${weatherObject.description}</p>
    <div class='local-sun-info'>
      <p class='small-paragraph'>Sunrise: ${weatherObject.sunrise}</p>
      <p class='small-paragraph'>Sunset: ${weatherObject.sunset}</p>
    </div>
    `;
};
// funtion to check if day or night
const isNight = (sunriseTimestamp, sunsetTimestamp) => {
    const currentTime = new Date();
    const sunrise = new Date(sunriseTimestamp * 1000);
    const sunset = new Date(sunsetTimestamp * 1000);
    if (currentTime >= sunrise && currentTime <= sunset) {
        return false;
    }
    else {
        return true;
    }
};
//Fetch forecast data 
const fetchForecastData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(FORECAST_URL);
        if (!response.ok) {
            throw new Error(`error status: ${response.status}`);
        }
        const data = yield response.json();
        // filter data to include only from 12:00 each day
        const forecastData = data.list.filter(item => {
            return item.dt_txt.includes('12:00:00');
        });
        // array to save forecast data in
        let forecastObjects = [];
        // create forecast objects for each element
        forecastData.forEach(item => {
            //get day of the week
            const timeStamp = new Date(item.dt * 1000);
            const day = timeStamp.toLocaleDateString('en-US', { weekday: 'short' });
            // weather icon
            const weatherIcon = WeatherIcon[item.weather[0].icon];
            //Create forecast object
            const forecast = {
                day: day,
                icon: `./assets/${weatherIcon}`,
                dayTemp: Math.ceil(item.main.temp)
            };
            forecastObjects.push(forecast);
        });
        // display forecast
        displayForecastData(forecastObjects);
    }
    catch (error) {
        console.error(`error: ${error}`);
    }
});
// display forecast
const displayForecastData = (forecastObjectArray) => {
    //clear forecast card
    forecastCard.innerHTML = '';
    //display forecast data
    forecastObjectArray.forEach(item => {
        forecastCard.innerHTML +=
            `
    <div class='forecast-day'>
      <p class='small-paragraph'>${item.day}</p>
      <div class='forecast-weather'>
        <img class='forecast-icon' src='${item.icon}' alt='weather-icon'>
      </div>
      <div class= "min-max">
      <p class='small-paragraph'>${item.dayTemp}°C</p>
      </div>
    </div>
    `;
    });
};
// function to show/hide forecast
// eventlistener for button
toggleForecastButton.addEventListener('click', () => {
    buttonArrow.classList.toggle('down');
    buttonContainer.classList.toggle('full');
    currentWeatherBackground.classList.toggle('full');
});
fetchCurrentWeather();
fetchForecastData();
