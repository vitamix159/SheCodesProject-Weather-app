let now = new Date();

let currentDate = document.querySelector("#date");

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day} ${month} ${date}, ${year} <br /> ${hours}:${minutes}`;

function searchButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-value");
  let cityName = searchInput.value;
  let apiKey = `940eef9ad873fd43d7217c86264acd04`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let tempDisplay = document.querySelector("#temperature");
  let tempData = Math.round(response.data.main.temp);
  let cityDisplay = document.querySelector(`#city`);
  let cityData = response.data.name;
  let countryData = response.data.sys.country;
  let cloudDisplay = document.querySelector(`#clouds`);
  let clouds = response.data.weather[0].description;
  let humidityDisplay = document.querySelector(`#humidity`);
  let windDisplay = document.querySelector(`#windSpeed`);
  let iconDisplay = document.querySelector("#weather-icon");
  
  celsiusTemperature = response.data.main.temp;
  
  tempDisplay.innerHTML = `${tempData}`;
  cityDisplay.innerHTML = `${cityData}, ${countryData}`;
  clouds = clouds.charAt(0).toUpperCase() + clouds.slice(1);
  cloudDisplay.innerHTML = `Clouds: ${clouds}`;
  humidityDisplay.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windDisplay.innerHTML = `Wind speed: ${Math.round(
  response.data.wind.speed
  )} m/s`;
  iconDisplay.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconDisplay.setAttribute("alt", response.data.weather[0].description);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchButton);

function yourLocation(event) {
  navigator.geolocation.getCurrentPosition(getWeather);
}

function getWeather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `940eef9ad873fd43d7217c86264acd04`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function displayFahrenheit (event) {
  event.preventDefault();
  celsiusLink.classList.remove(`active`);
  fahrenheitLink.classList.add(`active`);
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector(`#temperature`);
  temperatureElement.innerHTML = fahrenheitTemperature;
}
 function displayCelsius (event) {
   event.preventDefault();
   fahrenheitLink.classList.remove(`active`);
   celsiusLink.classList.add(`active`);
   let temperatureElement = document.querySelector(`#temperature`);
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
 }
let celsiusTemperature = null;

let displayWeather = document.querySelector("#current-location");
displayWeather.addEventListener("click", yourLocation);

let fahrenheitLink = document.querySelector(`#fahrenheit-link`);
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector(`#celsius-link`);
celsiusLink.addEventListener("click", displayCelsius);