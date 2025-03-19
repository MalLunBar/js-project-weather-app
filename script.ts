// Interface for weather data
interface Weather {
  city: string;
  temperature: number;
  icon: string;
  description: string;
  sunrise: string;
  sunset: string;
}

// enum for weather icons
enum WeatherIcon {
  '01d' = 'sunny-icon.svg',
  '01n' = 'moon-icon.svg',
  '02d' = 'partly-cloudy-icon.svg',
  '02n' = 'partly-cloudy-night-icon.svg',
  '03d' = 'cloudy-icon.svg',
  '03n' = 'cloudy-icon.svg',
  '04d' = 'cloudy-icon.svg',
  '04n' = 'cloudy-icon.svg',
  '09d' = 'rainy-icon.svg',
  '09n' = 'rainy-icon.svg',
  '10d' = 'rainy-icon.svg',
  '10n' = 'rainy-icon.svg',
  '11d' = 'thunderstorm-icon.svg',
  '11n' = 'thunderstorm-icon.svg',
  '13d' = 'snow-icon.svg',
  '13n' = 'snow-icon.svg',
  '50d' = 'mist-icon.svg',
  '50n' = 'mist-icon.svg'
}

// global variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '34b8b0ad1c772a50e7652217be753ce1'
const UNITS = 'metric'
const CITY = 'Stockholm'
const CURRENT_URL = `${BASE_URL}weather?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`
const FORECAST_URL = `${BASE_URL}forecast?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`

// DOM elements
const currentWeatherContainer = document.getElementById('circle') as HTMLDivElement
const currentWeather = document.getElementById('current-weather-top') as HTMLDivElement
const currentWeatherInfo = document.getElementById('current-weather-info') as HTMLDivElement


// fetch current weather data
const fetchCurrentWeather = async () => {
  try {
    const response = await fetch(CURRENT_URL)
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()
    // get sunrise and sunset time
    const sunriseTime = new Date(data.sys.sunrise * 1000)
    const sunsetTime = new Date(data.sys.sunset * 1000)
    // get weather icon
    const weatherIcon: string = WeatherIcon[data.weather[0].icon]
    // create weather object
    let currentWeather: Weather = {
      city: data.name,
      temperature: Math.ceil(data.main.temp),
      icon: `./assets/${weatherIcon}`,
      description: data.weather[0].description,
      sunrise: `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`,
      sunset: `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`
    }
    // display current weather
    displayCurrentWeather(currentWeather)

    // check if night and style accordingly
    isNight(data.sys.sunrise, data.sys.sunset) ?
      currentWeatherContainer.classList.add('night') :
      currentWeatherContainer.classList.remove('night')


  } catch (error) {
    console.error('Error:', error)
  }
}

// display current weather
const displayCurrentWeather = (weatherObject: Weather) => {
  currentWeather.innerHTML =
    `
    <p class='big-paragraph'>${weatherObject.temperature}<p class="celcius">°C</p></p>
    <div class='weather-icon-container'>
      <img class='weather-icon' src='${weatherObject.icon}' alt='weather-icon'>
    </div>
    `
  currentWeatherInfo.innerHTML =
    `
    <p class='medium-paragraph'>${weatherObject.city}</p>
    <p class='small-paragraph'>${weatherObject.description}</p>
    <div class='local-sun-info'>
      <p class='small-paragraph'>Sunrise: ${weatherObject.sunrise}</p>
      <p class='small-paragraph'>Sunset: ${weatherObject.sunset}</p>
    </div>
    `
}

// fetch forecast data

// display forecast data

// funtion to check if day or night
const isNight = (sunriseTimestamp: number, sunsetTimestamp: number): boolean => {
  const currentTime = new Date()
  const sunrise = new Date(sunriseTimestamp * 1000)
  const sunset = new Date(sunsetTimestamp * 1000)
  if (currentTime >= sunrise && currentTime < sunset) {
    return false
  } else {
    return true
  }
}


// f

// function to show/hide forecast

fetchCurrentWeather()

