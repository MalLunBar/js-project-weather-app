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
const currentWeather = document.getElementById('current-weather-top');
const currentWeatherInfo = document.getElementById('current-weather-info');
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
    }
    catch (error) {
        console.error('Error:', error);
    }
});
// display current weather
const displayCurrentWeather = (weatherObject) => {
    currentWeather.innerHTML =
        `
    <p class='big-paragraph'>${weatherObject.temperature}°C</p>
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
fetchCurrentWeather();
