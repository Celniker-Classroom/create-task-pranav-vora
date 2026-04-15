// add javascript here
function updateTime(){
    let now = new Date();
    let currentMonth = now.getMonth() +1;
    let currentDate = now.getDate();
    let currentYear = now.getFullYear();
    let currentTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    document.getElementById("date").textContent  = currentMonth + "/" + currentDate + "/" + currentYear;
    document.getElementById("time").textContent  = currentTime;
}

const lat = 32.7157;
const lon = -117.1638; 
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min`;



const weatherCodes = {
    0: "Clear Skies",
    1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing Rime Fog",
    51: "Light Drizzle", 53: "Moderate Drizzle", 55: "Dense Drizzle",
    61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
    71: "Slight Snow", 73: "Moderate Snow", 75: "Heavy Snow",
    77: "Snow Grains",
    80: "Slight Rain Showers", 81: "Moderate Rain Showers", 82: "Violent Rain Showers",
    85: "Slight Snow Showers", 86: "Heavy Snow Showers",
    95: "Thunderstorm", 96: "Thunderstorm with Slight Hail", 99: "Thunderstorm with Heavy Hail"
}; //this object was generated using AI overview


async function getCurrentWeatherData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Access current temperature from the response object
    const currentTemp = ((Number(data.current.temperature_2m) * (9/5)) + 32).toFixed(0);
    const currentWeather = weatherCodes[data.current.weather_code];
    const highTemp = ((Number(data.daily.temperature_2m_max[0]) * (9/5)) + 32).toFixed(0);
    const lowTemp = ((Number(data.daily.temperature_2m_min[0]) * (9/5)) + 32).toFixed(0);
    return [currentTemp, currentWeather, highTemp, lowTemp];
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function init() {
  const weatherData = await getCurrentWeatherData();
  let cityName = "San Diego";
  let [currentTemp, weather, high, low] = weatherData;
  let alerts = "No weather alerts are present.";

  displayWeather(cityName, currentTemp, weather, high, low, alerts);
}

init();




function displayWeather(cityName, currentTemp, weather, high, low, alerts){
  let background = document.getElementById("weather-container");
  let weatherText = document.getElementById("weather");
  document.getElementById("city-name").textContent = cityName;
  document.getElementById("current-temp").textContent = currentTemp;
  weatherText.textContent = weather;
  document.getElementById("high-low").textContent = "High: "+ high + " | Low: " + low;
  document.getElementById("alerts").textContent = alerts;


  if (weather == "Clear Skies" || weather == "Mainly Clear"){
    background.style.backgroundImage = "radial-gradient(circle at top left, #f9d71c 1%, #87CEEB 30%)";
  }else if (weather == "Partly Cloudy" || weather == "Overcast" ||weather == "Fog" ||weather == "Depositing Rime Fog"){
    background.style.backgroundImage = "linear-gradient(#ffffff 1%, #DCD9E6 30%)";
  }else if (weather == "Light Drizzle" || weather == "Moderate Drizzle" ||weather == "Dense Drizzle"){
    background.style.backgroundImage = "linear-gradient( #A0B0C0 1%, #DCD9E6 30%)";
  }else if (weather == "Slight Rain" || weather == "Moderate Rain" ||weather == "Heavy Rain" || weather == "Slight Rain Showers" || weather == "Moderate Rain Showers" || weather == "Violent Rain Showers"){
    background.style.backgroundImage = "linear-gradient( #A0B0D0 10%, #DCD9E6 90%)";
  }else if (weather == "Snow Grains" || weather == "Slight Snow" || weather == "Moderate Snow" ||weather == "Heavy Snow" || weather == "Slight Snow Showers" || weather == "Heavy Snow Showers"){
    background.style.backgroundImage = "linear-gradient( #ADD5FF 10%, #E3F0FD 90%)";
  }else if (weather == "Thunderstorm" || weather == "Thunderstorm with Slight Hail" || weather == "Thunderstorm with Heavy Hail"){
    background.style.backgroundImage = 'linear-gradient(#001C3D 10%, #00468C 90%)';
  }else{
    background.style.backgroundImage = "radial-gradient(circle at top left, #f9d71c 1%, #87CEEB 30%)";
  }
}

setInterval(updateTime, 1000);

