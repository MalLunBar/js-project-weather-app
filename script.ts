// Interface for weather data
interface Weather {
  city: string;
  temperature: number;
  icon: string;
  description: string;
  sunrise: string;
  sunset: string;
}

interface Forecast {
  day: string;
  icon: string;
  dayTemp: number;
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
const CITY = 'stockholm'


// DOM elements
const currentWeatherBackground = document.getElementById('current-weather-background') as HTMLDivElement
const currentWeather = document.getElementById('current-weather-top') as HTMLDivElement
const currentWeatherInfo = document.getElementById('current-weather-info') as HTMLDivElement
const forecastContainer = document.getElementById('forecast-container') as HTMLDivElement
const toggleForecastButton = document.getElementById('toggle-btn') as HTMLButtonElement
const buttonArrow = document.getElementById('arrow') as HTMLButtonElement
const buttonContainer = document.getElementById('button-container') as HTMLDivElement
const cityInput = document.getElementById('search-bar') as HTMLInputElement
const searchButton = document.getElementById('search-btn') as HTMLButtonElement
// const errorMessage = document.getElementById('error-message') as HTMLParagraphElement


//test function to fetch weather depending on user input
const fetchWeatherForCity = async (city: string) => {
  console.log("jag kör fetchWeatherForCity")
  if (!city.trim()) {
    //här bör vi ha att en div skapas eller nått med felmeddelande eller alert 
    console.log('Please enter a city')
    return
  }
  const currentCity = city.trim()
  const CURRENT_URL = `${BASE_URL}weather?q=${currentCity}&units=${UNITS}&APPID=${API_KEY}`
  const FORECAST_URL = `${BASE_URL}forecast?q=${currentCity}&units=${UNITS}&APPID=${API_KEY}`
  try {
    //fetch current weather
    await fetchCurrentWeather(CURRENT_URL)

    await fetchForecastData(FORECAST_URL)

    //HÄR måste vi tömma diven om vi skapar en div för felmeddelande
  } catch (error) {
    console.log('Error:', error)
  }

}


// fetch current weather data
const fetchCurrentWeather = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()

    // get sunrise and sunset time - adding the timezone offset to get local time
    const sunriseTime = new Date((data.sys.sunrise + data.timezone) * 1000)
    const sunsetTime = new Date((data.sys.sunset + data.timezone) * 1000)

    // format sunrise and sunset time to display correctly
    // By default, JavaScript will use the browser's time zone when creating a Date object - this is why we need to use getUTCHours() to display the correct time
    const sunriseTimeString = `${sunriseTime.getUTCHours().toString().padStart(2, '0')}:${sunriseTime.getMinutes().toString().padStart(2, '0')}`
    const sunsetTimeString = `${sunsetTime.getUTCHours().toString().padStart(2, '0')}:${sunsetTime.getMinutes().toString().padStart(2, '0')}`

    // get weather icon
    const weatherIcon: string = WeatherIcon[data.weather[0].icon as keyof typeof WeatherIcon]

    // create weather object
    let currentWeather: Weather = {
      city: data.name,
      temperature: Math.ceil(data.main.temp),
      icon: `./assets/${weatherIcon}`,
      description: data.weather[0].description,
      sunrise: sunriseTimeString,
      sunset: sunsetTimeString
    }

    // display current weather
    displayCurrentWeather(currentWeather)

    // check if night and style accordingly
    isNight(data.sys.sunrise, data.sys.sunset) ?
      currentWeatherBackground.classList.add('night') :
      currentWeatherBackground.classList.remove('night')

  } catch (error) {
    console.error('Error:', error)
  }
}

// display current weather
const displayCurrentWeather = (weatherObject: Weather) => {
  currentWeather.innerHTML =
    `
    <p class='big-paragraph'>${weatherObject.temperature}<sup class="celcius">°C</sup></p>
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

// funtion to check if day or night
const isNight = (sunriseTimestamp: number, sunsetTimestamp: number): boolean => {
  const currentTime = new Date()
  const sunrise = new Date(sunriseTimestamp * 1000)
  const sunset = new Date(sunsetTimestamp * 1000)
  if (currentTime >= sunrise && currentTime <= sunset) {
    return false
  } else {
    return true
  }
}

//Fetch forecast data 
const fetchForecastData = async (url: string) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`error status: ${response.status}`)
    }
    const data = await response.json()

    // filter data to include only from 12:00 each day
    const forecastData = data.list.filter((item: any) => {
      return item.dt_txt.includes('12:00:00')
    })
    // array to save forecast data in
    let forecastObjects: Forecast[] = []
    // create forecast objects for each element
    forecastData.forEach((item: any) => {
      //get day of the week
      const timeStamp = new Date(item.dt * 1000)
      const day = timeStamp.toLocaleDateString('en-US', { weekday: 'short' })
      // weather icon
      const weatherIcon: string = WeatherIcon[item.weather[0].icon as keyof typeof WeatherIcon]
      //Create forecast object
      const forecast: Forecast = {
        day: day,
        icon: `./assets/${weatherIcon}`,
        dayTemp: Math.ceil(item.main.temp)
      }
      forecastObjects.push(forecast)
    })
    // display forecast
    displayForecastData(forecastObjects)

  } catch (error) {
    //ändra här så att vi visar diven med felmeddelande
    console.error(`error: ${error}`)
  }
}

// display forecast
const displayForecastData = (forecastObjectArray: Forecast[]) => {
  //clear forecast card
  forecastContainer.innerHTML = ''
  //display forecast data
  forecastObjectArray.forEach(item => {
    forecastContainer.innerHTML +=
      `
    <div class='forecast-card'>
      <p class='small-paragraph'>${item.day}</p>
      <div class='forecast-weather'>
        <img class='forecast-icon' src='${item.icon}' alt='weather-icon'>
      </div>
      <div class= "min-max">
      <p class='small-paragraph'>${item.dayTemp}°C</p>
      </div>
    </div>
    `
  })

}

// eventlistener for button to show/hide forecast
toggleForecastButton.addEventListener('click', () => {
  buttonArrow.classList.toggle('down')
  buttonContainer.classList.toggle('full')
  currentWeatherBackground.classList.toggle('full')
  forecastContainer.classList.toggle('show')
})

fetchWeatherForCity(CITY)


//eventlistener for search button
searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  const city = cityInput.value
  fetchWeatherForCity(city)
  console.log(city)
})




