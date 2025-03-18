// global variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '34b8b0ad1c772a50e7652217be753ce1'
const UNITS = 'metric'
const CITY = 'Stockholm'
const CURRENT_URL = `${BASE_URL}weather?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`
const FORECAST_URL = `${BASE_URL}forecast?q=${CITY}&units=${UNITS}&APPID=${API_KEY}`

// DOM elements
const currentWeatherContainer = document.getElementById('current-weather-container') as HTMLDivElement


// fetch data
const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`)
    }
    const data = await response.json()

    console.log('fetched data', data)

  } catch (error) {
    console.error('Error:', error)
  }
}


fetchData(CURRENT_URL)
