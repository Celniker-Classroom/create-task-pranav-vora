function updateTime(){
    let now = new Date();
    let currentMonth = now.getMonth() +1;
    let currentDate = now.getDate();
    let currentYear = now.getFullYear();
    let currentTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    document.getElementById("date").textContent  = currentMonth + "/" + currentDate + "/" + currentYear;
    document.getElementById("time").textContent  = currentTime;
}
let lat = 32.7157;
let lon = -117.1638;
init("San Diego");
document.getElementById("button").addEventListener("click", function(){
  let userInput =  document.getElementById("city-input").value;
  const coordinates = getCityCoordinates(userInput);
  lat = coordinates[0];
  lon = coordinates[1];
  init(userInput);
});


const cityCoords = {
  "Los Angeles": [34.0522, -118.2437],
  "Chicago": [41.8781, -87.6298],
  "Houston": [29.7604, -95.3698],
  "Phoenix": [33.4484, -112.0740],
  "Philadelphia": [39.9526, -75.1652],
  "San Antonio": [29.4241, -98.4936],
  "San Diego": [32.7157, -117.1638],
  "Dallas": [32.7767, -96.7970],
  "Jacksonville": [30.3322, -81.6557],
  "Fort Worth": [32.7555, -97.3308],
  "San Jose": [37.3382, -121.8863],
  "Austin": [30.2672, -97.7431],
  "Charlotte": [35.2271, -80.8431],
  "Columbus": [39.9612, -82.9988],
  "New York": [40.7128, -74.0060],
  "London": [51.5074, -0.1278],
  "Tokyo": [35.6895, 139.6917],
  "Delhi": [28.6139, 77.2090],
  "Shanghai": [31.2304, 121.4737],
  "Dhaka": [23.8103, 90.4125],
  "Sao Paulo": [-23.5505, -46.6333],
  "Cairo": [30.0444, 31.2357],
  "Mexico City": [19.4326, -99.1332],
  "Beijing": [39.9042, 116.4074],
  "Mumbai": [18.9750, 72.8258],
  "Osaka": [34.6937, 135.5023],
  "Kinshasa": [-4.4419, 15.2663],
  "Chongqing": [29.5630, 106.5516],
  "Karachi": [24.8607, 67.0011],
  "Lagos": [6.5244, 3.3792],
  "Istanbul": [41.0082, 28.9784],
  "Kolkata": [22.5726, 88.3639],
  "Buenos Aires": [-34.6037, -58.3816],
  "Manila": [14.5995, 120.9842],
  "Lahore": [31.5204, 74.3587],
  "Guangzhou": [23.1291, 113.2644],
  "Tianjin": [39.0842, 117.2009],
  "Bangalore": [12.9716, 77.5946],
  "Rio de Janeiro": [-22.9068, -43.1729],
  "Shenzhen": [22.5431, 114.0579],
  "Moscow": [55.7558, 37.6173]
}; //this object was generated using AI overview




function getCityCoordinates(userInput){
  let cities = Object.keys(cityCoords);
  for (let i = 0; i < cities.length; i++){
    if (cities[i].toLowerCase() == userInput.toLowerCase()){
      document.getElementById("input-msg").textContent = "";
      return cityCoords[cities[i]];
    }
  }
  document.getElementById("input-msg").textContent = "Please enter a valid city and check your spelling!";
  return null;
 
}






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
  // API Name: OpenWeatherMap API
  // Author: OpenWeather
  // Source: https://openweathermap.org
  // Date Retrieved: April 17, 2026
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const currentTemp = ((Number(data.current.temperature_2m) * (9/5)) + 32).toFixed(0);
    const currentWeather = weatherCodes[data.current.weather_code];
    const highTemp = ((Number(data.daily.temperature_2m_max[0]) * (9/5)) + 32).toFixed(0);
    const lowTemp = ((Number(data.daily.temperature_2m_min[0]) * (9/5)) + 32).toFixed(0);
    return [currentTemp, currentWeather, highTemp, lowTemp];
  } catch (error) {
    console.error("Fetch error:", error);
  }
}


async function getHourlyWeatherData(hour) {
  // API Name: OpenWeatherMap API
  // Author: OpenWeather
  // Source: https://openweathermap.org
  // Date Retrieved: April 17, 2026
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&timezone=auto&forecast_days=1`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const targetIndex = hour;
    const data = await response.json();
    const Temp = ((Number(data.hourly.temperature_2m[targetIndex]) * (9/5)) + 32).toFixed(0);
    const Weather = weatherCodes[data.hourly.weather_code[targetIndex]];
    return [Temp, Weather];
  } catch (error) {
    console.error("Fetch error:", error);
  }
}


async function getDailyWeatherData(day) {
  // API Name: OpenWeatherMap API
  // Author: OpenWeather
  // Source: https://openweathermap.org
  // Date Retrieved: April 17, 2026
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=7`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const targetIndex = day;
    const data = await response.json();
    const highTemp = ((Number(data.daily.temperature_2m_max[targetIndex]) * (9/5)) + 32).toFixed(0);
    const lowTemp = ((Number(data.daily.temperature_2m_min[targetIndex]) * (9/5)) + 32).toFixed(0);
    const Weather = weatherCodes[data.daily.weather_code[targetIndex]];
    return [highTemp, lowTemp, Weather];
  } catch (error) {
    console.error("Fetch error:", error);
  }
}








async function init(userInput) {
  let hourlyData = [];
  for(let i = 0; i<24; i+=3){
    hourlyData.push(await getHourlyWeatherData(i));
  }

  let dailyData = [];
  for(let i = 0; i<7; i++){
      dailyData.push(await getDailyWeatherData(i));
  }
  let weatherData = await getCurrentWeatherData();
  let cityName = userInput;
  let [currentTemp, weather, high, low] = weatherData;


  displayWeather(cityName, currentTemp, weather, high, low, hourlyData, dailyData);
}












function displayWeather(cityName, currentTemp, weather, high, low, hourlyData, dailyData){
  let background = document.getElementById("weather-container");
  let weatherText = document.getElementById("weather");
  document.getElementById("city-name").textContent = cityName;
  document.getElementById("current-temp").textContent = currentTemp;
  weatherText.textContent = weather;
  document.getElementById("high-low").textContent = "High: "+ high + " | Low: " + low;




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

  //code for hourly data
  let hourContainer=document.getElementById('hour');
  let containerForHours=document.getElementById('hourly-forecast');
  containerForHours.innerHTML = "";
  for(let i =0; i<hourlyData.length;i++){
    let hourIncrement = (24/hourlyData.length);
    let hour = hourIncrement * i;
    let clone = hourContainer.cloneNode(true);
    // Determine AM or PM
    let ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;

    if (hour === 0) {
      hour = 12;
    }


    clone.removeAttribute('hidden');
    clone.textContent=hour + ampm + " | " + hourlyData[i][0] + " | " + hourlyData[i][1]; 
    clone.id = 'hour-' + i;
    containerForHours.appendChild(clone);
  }

  let dailyContainer=document.getElementById('day');
  let containerForDays=document.getElementById('weekly-forecast');
  containerForDays.innerHTML = "";
  for(let i =0; i<dailyData.length;i++){
    let clone = dailyContainer.cloneNode(true);
    clone.removeAttribute('hidden');
    clone.textContent=dailyData[i][0] + " | " + dailyData[i][1]; 
    clone.id = 'day-' + i;
    containerForDays.appendChild(clone);
  }



  
}


setInterval(updateTime, 1000);





