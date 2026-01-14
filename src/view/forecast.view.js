import { getWeekdayNames } from "../controller/controller";
import { weatherIcons } from "../controller/weatherIcons";

// Renders forecast temperature values into the corresponding DOM elements
export function renderForecastTemp(tempData) {
  const forecastTemp = document.querySelectorAll(".day > .upcoming-temp");
  tempData.forEach((temp, index) => {
    if (forecastTemp[index]) {
      forecastTemp[index].textContent = temp;
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
