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
    console.log('temperature:', data.main.temp)
    console.log('sunrise:', data.sys.sunrise)
    console.log('sunset:', data.sys.sunset)
    console.log('weather icon:', data.weather[0].icon)
    console.log('weather description:', data.weather[0].description)

    currentWeather.innerHTML = `<p class="big-paragraph">${Math.ceil(data.main.temp)}°C</p>`
    weatherIconContainer.innerHTML = `<img src="" alt = "weather icon">`
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