// global variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '34b8b0ad1c772a50e7652217be753ce1'
const UNITS = 'metric'
const CITY = 'Stockholm'
const CURRENT_URL = `${BASE_URL}weather?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`
const FORECAST_URL = `${BASE_URL}forecast?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`

// DOM elements
const currentWeatherContainer = document.getElementById('current-weather-container') as HTMLDivElement
const currentWeather = document.getElementById('current-weather-top') as HTMLDivElement
const weatherIconContainer = document.getElementById('weather-icon-container') as HTMLDivElement
const currentWeatherInfo = document.getElementById('current-weather-info') as HTMLDivElement
const localSunInfo = document.getElementById('local-sun-info') as HTMLDivElement

// enum for weather icons
enum WeatherIcon {
  '01d' = 'sunny-icon.svg',
  '01n' = 'moon-icon.svg',
  '02d' = 'partly-cloudy-icon.svg',
  '02n' = 'partly-cloudy-icon.svg',
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

// fetch data
const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()

    console.log(data)

    console.log('city:', data.name)
    console.log('temperature:', `${Math.ceil(data.main.temp)}°C`)
    const sunriseTime = new Date(data.sys.sunrise * 1000)
    console.log('sunrise:', `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`)
    const sunsetTime = new Date(data.sys.sunset * 1000)
    console.log('sunset:', `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`)
    console.log('weather icon:', data.weather[0].icon)
    const weatherIcon: string = WeatherIcon[data.weather[0].icon]
    console.log('weather icon:', `./assets/${weatherIcon}`)
    console.log('weather description:', data.weather[0].description)

    currentWeather.innerHTML = `<p class="big-paragraph">${Math.ceil(data.main.temp)}°C</p>`
    weatherIconContainer.innerHTML = `<img src="./assets/${weatherIcon}" alt = "weather icon">`
    currentWeatherInfo.innerHTML = `
      <p class="medium-paragraph">${data.name}</p>
      <p class="small-paragraph">${data.weather[0].description}</p>`
    localSunInfo.innerHTML = `
      <p class="small-paragraph">Sunrise: ${data.sys.sunrise}</p>
      <p class="small-paragraph">Sunset: ${data.sys.sunset}</p>`

    return data

  } catch (error) {
    console.error('Error:', error)
  }
}

fetchData(CURRENT_URL)



// current weather
const createCurrentWeatherObject = () => {
  // fetch current weather data

}



const loadWeather = () => {
  currentWeather.innerHTML = `<p class="big-paragraph">${obj.temerature}</p>`
  weatherIconContainer.innerHTML = `<img src="" alt = "weather icon">`
  currentWeatherInfo.innerHTML = `<p class="medium-paragraph">${obj.city}</p>
  <p class="small-paragraph">${obj.description}</p>`
  localSunInfo.innerHTML = `<p class="small-paragraph">Sunrise: ${obj.sunrise}</p><p class="small-paragraph">Sunset: ${obj.sunset}</p>`

  //OBS sunrise och sunset är konstiga DATE-tider. 


}

//funktion som går igenom iconerna 