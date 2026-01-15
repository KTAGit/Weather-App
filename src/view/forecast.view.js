import { getWeekdayNames } from "../controller/controller";
import { weatherIcons } from "../controller/weatherIcons";

// Renders forecast temperature values into the corresponding DOM elements
export function renderForecastTemp(lowTemp, highTemp) {
  const lowForecastTemp = document.querySelectorAll(".low.upcoming-temp");
  const highForecastTemp = document.querySelectorAll(".high.upcoming-temp");
  lowTemp.forEach((lowTemp, index) => {
    if (lowForecastTemp[index]) {
      lowForecastTemp[index].textContent = lowTemp;
    }
  });
  highTemp.forEach((highTemp, index) => {
    if (highForecastTemp[index]) {
      highForecastTemp[index].textContent = highTemp;
    }
  });
}

// Renders forecast weather icons into the corresponding DOM image elements
export function renderForecastIcon(iconData) {
  const forecastIcon = document.querySelectorAll(".day > img");
  iconData.forEach((icon, index) => {
    if (forecastIcon[index]) {
      forecastIcon[index].src = weatherIcons[icon];
    }
  });
}

// Renders upcoming weekday names (excluding today) into the forecast UI.
export function renderDayNames() {
  const dayNamesEl = document.querySelectorAll(".day > .day-name");
  const dayNames = getWeekdayNames();
  dayNames.shift();
  dayNames.forEach((name, index) => {
    if (dayNamesEl[index]) {
      dayNamesEl[index].textContent = name;
    }
  });
}
