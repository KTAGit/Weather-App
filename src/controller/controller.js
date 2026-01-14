import { toggleSearchInput } from "../view/searchSection.view";
import { toggleSettingsVisibility } from "../view/searchSection.view";
import { getWeatherData } from "../app";
import { selectTempSetting } from "../view/searchSection.view";
import { weatherDataStorage } from "../app";
import { renderWeatherIcon } from "../view/currentWeather.view";
import { renderLocation } from "../view/searchSection.view";
import { renderWeatherTemp } from "../view/currentWeather.view";
import { renderWeatherCondition } from "../view/currentWeather.view";
import { renderWindData } from "../view/currentWeather.view";
import { renderHumidityData } from "../view/currentWeather.view";
import { renderRainData } from "../view/currentWeather.view";

// Stores the currently selected temperature unit ("c" or "f")
export let currentTempSetting = "F";

// Select DOM elements
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const tempSettings = document.querySelectorAll(".degree-buttons > button");

// Handles the search button click by toggling the input, reading/validating its value, and clearing it.
function handleSearch() {
  toggleSearchInput();
  const inputValue = searchInput.value.trim();
  if (inputValue === "") return;

  getWeatherData(inputValue);
  searchInput.value = "";
}

// Attach the handler function to the search button click event
searchBtn.addEventListener("click", () => {
  handleSearch();
});

document.querySelector(".settings-container").addEventListener("click", (e) => {
  toggleSettingsVisibility();
});

// Handles temperature unit selection and hides the settings menu
tempSettings.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentTempSetting = btn.dataset.unit;
    selectTempSetting(currentTempSetting);
    toggleSettingsVisibility();
  });
});

// Updates all UI elements that depend on the current weather data
export function updateAllRequiredData() {
  updateWeatherIcon();
  updateLocationName();
  updateWeatherTemp();
  updateWeatherCondition();
  updateWindGust();
  updateHumidityData();
  updateRainData();
}

// Updates the weather icon based on the current weather data
function updateWeatherIcon() {
  const weatherIconName = weatherDataStorage.icon;
  renderWeatherIcon(weatherIconName);
}

// Updates the displayed location name using the current location data
function updateLocationName() {
  const loctionName = getCityState(weatherDataStorage.location);
  renderLocation(loctionName);
}

// Updates the displayed temperature value
function updateWeatherTemp() {
  const temp = weatherDataStorage.temp;
  renderWeatherTemp(temp);
}

// Updates the displayed weather condition (e.g. cloudy, sunny)
function updateWeatherCondition() {
  const condition = weatherDataStorage.condition;
  renderWeatherCondition(condition);
}

// Updates the displayed wind gust information
function updateWindGust() {
  const windgust = weatherDataStorage.windgust;
  renderWindData(windgust);
}

// Updates the displayed humidity information
function updateHumidityData() {
  const humidity = weatherDataStorage.humidity;
  renderHumidityData(humidity);
}

// Updates the displayed precipitation information
function updateRainData() {
  const rainData = weatherDataStorage.precip;
  renderRainData(rainData);
}

// Extracts and formats the city and state from a location string
function getCityState(location) {
  return location
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");
}
