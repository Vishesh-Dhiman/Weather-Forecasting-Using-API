// API_KEY and BASE_URL are not needed; use Flask backend endpoints
const API_URL = "/api/weather";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const locationElement = document.getElementById("location");
const dateElement = document.getElementById("date");
const tempElement = document.getElementById("temp");
const conditionsElement = document.getElementById("conditions");
const weatherIcon = document.getElementById("weather-icon");
const feelsLikeElement = document.getElementById("feels-like");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const forecastElement = document.getElementById("forecast");
const loadingElement = document.getElementById("loading");

let map;
let mapMarker;

document.addEventListener("DOMContentLoaded", () => {
    getLocationWeather();
    map = L.map('map').setView([20.5937, 78.9629], 5); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
});

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) getWeatherByCity(city);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) getWeatherByCity(city);
    }
});

locationBtn.addEventListener("click", getLocationWeather);

function showLoading() { loadingElement.style.display = "flex"; }
function hideLoading() { loadingElement.style.display = "none"; }

function updateDateTime(dt, timezone) {
    const now = dt ? new Date((dt + timezone) * 1000) : new Date();
    dateElement.textContent = now.toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
}

async function getWeatherByCity(city) {
    showLoading();
    try {
        const response = await fetch(`${API_URL}?city=${encodeURIComponent(city)}`);
        const data = await response.json();
        if (data.current.cod !== 200) throw new Error(data.current.message);
        updateWeatherUI(data.current, data.forecast);
    } catch (error) {
        alert(`Error: ${error.message}`);
        hideLoading();
    }
}

async function getLocationWeather() {
    showLoading();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`${API_URL}?lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                if (data.current.cod !== 200) throw new Error(data.current.message);
                updateWeatherUI(data.current, data.forecast);
            } catch (error) {
                alert(`Error: ${error.message}`);
                hideLoading();
            }
        }, (error) => {
            alert("Geolocation error: " + error.message);
            hideLoading();
        });
    } else {
        alert("Geolocation is not supported");
        getWeatherByCity("Raebareli");
    }
}

function updateWeatherUI(currentData, forecastData) {
    locationElement.textContent = `${currentData.name}, ${currentData.sys.country}`;
    updateDateTime(currentData.dt, currentData.timezone);
    tempElement.textContent = `${Math.round(currentData.main.temp)}°C`;
    conditionsElement.textContent = currentData.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
    weatherIcon.alt = currentData.weather[0].main;
    feelsLikeElement.textContent = Math.round(currentData.main.feels_like);
    humidityElement.textContent = currentData.main.humidity;
    windElement.textContent = Math.round(currentData.wind.speed * 3.6);

    updateForecast(forecastData);

    if (map && currentData.coord) {
        const { lat, lon } = currentData.coord;
        map.setView([lat, lon], 10);
        if (mapMarker) {
            map.removeLayer(mapMarker);
        }
        mapMarker = L.marker([lat, lon]).addTo(map)
            .bindPopup(`${currentData.name}, ${currentData.sys.country}`)
            .openPopup();
    }
    hideLoading();
}

function updateForecast(forecastData) {
    if (!forecastData || !forecastData.list) return;
    const dailyForecast = {};
    forecastData.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecast[date]) dailyForecast[date] = [];
        dailyForecast[date].push(item);
    });

    const forecastDays = Object.keys(dailyForecast).slice(1, 6);
    forecastElement.innerHTML = "";

    forecastDays.forEach((day) => {
        const dayData = dailyForecast[day];
        const dayName = new Date(day).toLocaleDateString("en-US", { weekday: "short" });
        const dayHigh = Math.max(...dayData.map((item) => item.main.temp_max));
        const dayLow = Math.min(...dayData.map((item) => item.main.temp_min));
        const dayIcon = dayData[Math.floor(dayData.length / 2)].weather[0].icon;

        const forecastItem = document.createElement("div");
        forecastItem.className = "forecast-item";
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon">
                <img src="https://openweathermap.org/img/wn/${dayIcon}.png" alt="icon">
            </div>
            <div class="forecast-temp">
                <span class="forecast-high">${Math.round(dayHigh)}°</span>
                <span class="forecast-low">${Math.round(dayLow)}°</span>
            </div>
        `;
        forecastElement.appendChild(forecastItem);
    });
}
