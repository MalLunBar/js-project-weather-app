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
// global variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '34b8b0ad1c772a50e7652217be753ce1';
const UNITS = 'metric';
const CITY = 'Stockholm';
const CURRENT_URL = `${BASE_URL}weather?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`;
const FORECAST_URL = `${BASE_URL}forecast?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`;
// DOM elements
const currentWeatherContainer = document.getElementById('current-weather-container');
const currentWeather = document.getElementById('current-weather-top');
const weatherIconContainer = document.getElementById('weather-icon-container');
const currentWeatherInfo = document.getElementById('current-weather-info');
const localSunInfo = document.getElementById('local-sun-info');
// fetch data
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        const data = yield response.json();
        console.log(data);
        console.log('city:', data.name);
        console.log('temperature:', data.main.temp);
        console.log('sunrise:', data.sys.sunrise);
        console.log('sunset:', data.sys.sunset);
        console.log('weather icon:', data.weather[0].icon);
        console.log('weather description:', data.weather[0].description);
        currentWeather.innerHTML = `<p class="big-paragraph">${Math.ceil(data.main.temp)}°C</p>`;
        weatherIconContainer.innerHTML = `<img src="" alt = "weather icon">`;
        currentWeatherInfo.innerHTML = `
      <p class="medium-paragraph">${data.name}</p>
      <p class="small-paragraph">${data.weather[0].description}</p>`;
        localSunInfo.innerHTML = `
      <p class="small-paragraph">Sunrise: ${data.sys.sunrise}</p>
      <p class="small-paragraph">Sunset: ${data.sys.sunset}</p>`;
        return data;
    }
    catch (error) {
        console.error('Error:', error);
    }
});
fetchData(CURRENT_URL);
// current weather
const createCurrentWeatherObject = () => {
    // fetch current weather data
};
const loadWeather = (obj) => {
    currentWeather.innerHTML = `<p class="big-paragraph">${obj.temerature}</p>`;
    weatherIconContainer.innerHTML = `<img src="" alt = "weather icon">`;
    currentWeatherInfo.innerHTML = `<p class="medium-paragraph">${obj.city}</p>
  <p class="small-paragraph">${obj.description}</p>`;
    localSunInfo.innerHTML = `<p class="small-paragraph">Sunrise: ${obj.sunrise}</p><p class="small-paragraph">Sunset: ${obj.sunset}</p>`;
    //OBS sunrise och sunset är konstiga DATE-tider. 
};
//funktion som går igenom iconerna 
