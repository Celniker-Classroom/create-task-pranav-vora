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
const lon = 117.1638; 
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;


async function getCurrentWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    
    // Access current temperature from the response object
    const currentTemp = data.current.temperature_2m;
    const unit = data.current_units.temperature_2m;
    console.log(`Current temperature: ${currentTemp}${unit}`);
    return currentTemp;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}





let cityName = "San Diego";
let currentTemp = await getCurrentWeather();
let weather = "Sunny";
let high = "77";
let low = "57";
let alerts = "No weather alerts are present.";
displayWeather(cityName, currentTemp, weather, high, low, alerts);


function displayWeather(cityName, currentTemp, weather, high, low, alerts){
    document.getElementById("city-name").textContent = cityName;
    document.getElementById("current-temp").textContent = currentTemp;
    document.getElementById("weather").textContent = weather;
    document.getElementById("high-low").textContent = "High: "+ high + " | Low: " + low;
    document.getElementById("alerts").textContent = alerts;
}

setInterval(updateTime, 1000);

