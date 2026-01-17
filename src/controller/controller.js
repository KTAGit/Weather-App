import { toggleSearchInput } from "../view/searchSection.view";
import { toggleSettingsVisibility } from "../view/searchSection.view";
import { getWeatherData } from "../app";
import { selectTempSetting } from "../view/searchSection.view";
import { currentWeatherDataStorage } from "../app";
import { renderWeatherIcon } from "../view/currentWeather.view";
import { renderLocation } from "../view/searchSection.view";
import { renderWeatherTemp } from "../view/currentWeather.view";
import { renderWeatherCondition } from "../view/currentWeather.view";
import { renderWindData } from "../view/currentWeather.view";
import { renderHumidityData } from "../view/currentWeather.view";
import { renderRainData } from "../view/currentWeather.view";
import { forecastWeatherDataStorage } from "../app";
import { renderForecastTemp } from "../view/forecast.view";
import { renderForecastIcon } from "../view/forecast.view";
import { renderDayNames } from "../view/forecast.view";
import { hundleSearch } from "../app";

// Stores the currently selected temperature unit ("c" or "f")
export let currentTempSetting = "F";
export let location =
  JSON.parse(localStorage.getItem("location-data")) ?? "New York NY";

// Select DOM elements
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const tempSettings = document.querySelectorAll(".degree-buttons > button");

// Handles the search button click by toggling the input, reading/validating its value, and clearing it.
function handleSearch() {
  toggleSearchInput();
  const inputValue = searchInput.value.trim();
  if (inputValue === "") return;

  location = inputValue;
  hundleSearch();

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
    changeTempUnit();
    hundleSearch();
    updateAllRequiredData();
  });
});

// Returns the API temperature unit based on the current temperature setting
export function changeTempUnit() {
  if (currentTempSetting === "C") {
    return "metric";
  } else {
    return "us";
  }
}

// Updates all UI elements that depend on the current weather data
export function updateAllRequiredData() {
  updateWeatherIcon();
  updateLocationName();
  updateWeatherTemp();
  updateWeatherCondition();
  updateWindGust();
  updateHumidityData();
  updateRainData();
  getForecastData();
  renderDayNames();
}

// Updates the weather icon based on the current weather data
function updateWeatherIcon() {
  const weatherIconName = currentWeatherDataStorage.icon;
  renderWeatherIcon(weatherIconName);
}

// Updates the displayed location name using the current location data
function updateLocationName() {
  const loctionName = getCityState(currentWeatherDataStorage.location);
  renderLocation(loctionName);
}

// Updates the displayed temperature value
function updateWeatherTemp() {
  const temp = currentWeatherDataStorage.temp;
  renderWeatherTemp(temp);
}

// Updates the displayed weather condition (e.g. cloudy, sunny)
function updateWeatherCondition() {
  const condition = currentWeatherDataStorage.condition;
  renderWeatherCondition(condition);
}

// Updates the displayed wind gust information
function updateWindGust() {
  const windgust = currentWeatherDataStorage.windgust;
  renderWindData(windgust);
}

// Updates the displayed humidity information
function updateHumidityData() {
  const humidity = currentWeatherDataStorage.humidity;
  renderHumidityData(humidity);
}

// Updates the displayed precipitation information
function updateRainData() {
  const rainData = currentWeatherDataStorage.precip;
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

// Generates and returns an array of abbreviated weekday names starting from today
export function getWeekdayNames() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    days.push(date.toLocaleDateString("en-us", { weekday: "short" }));
  }
  return days;
}

// Extracts temperature and icon data from forecast storage and triggers forecast rendering
function getForecastData() {
  const lowForecastTemp = [];
  const highForecastTemp = [];
  const forecastIcon = [];
  for (let i = 0; i < forecastWeatherDataStorage.length; i++) {
    lowForecastTemp.push(Math.round(forecastWeatherDataStorage[i].tempmin));
    highForecastTemp.push(Math.round(forecastWeatherDataStorage[i].tempmax));
    forecastIcon.push(forecastWeatherDataStorage[i].icon);
  }
  renderForecastTemp(lowForecastTemp, highForecastTemp);
  renderForecastIcon(forecastIcon);
}
