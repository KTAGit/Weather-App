import { weatherIcons } from "../controller/weatherIcons";

// Renders the weather icon based on the provided icon name
export function renderWeatherIcon(weatherIconName) {
  const weatherIconEl = document.querySelector(".weather-icon");
  weatherIconEl.src = weatherIcons[weatherIconName];
}

// Renders the current temperature value
export function renderWeatherTemp(temp) {
  const weatherTempEl = document.querySelector(".temp");
  weatherTempEl.textContent = Math.round(temp);
}

// Renders the current weather condition text
export function renderWeatherCondition(condition) {
  const weatherConditionEl = document.querySelector(".weather-condition");
  weatherConditionEl.textContent = condition;
}

// Renders the wind gust speed
export function renderWindData(windgust) {
  const windDataEl = document.querySelector(".wind-data");
  windDataEl.textContent = `${Math.round(windgust)} mph`;
}

// Renders the humidity percentage
export function renderHumidityData(humidity) {
  const humidityDataEl = document.querySelector(".humidity-data");
  humidityDataEl.textContent = `${Math.round(humidity)}%`;
}

// Renders the precipitation amount
export function renderRainData(rain) {
  const rainDataEl = document.querySelector(".rain-data");
  rainDataEl.textContent = `${rain}″`;
}
