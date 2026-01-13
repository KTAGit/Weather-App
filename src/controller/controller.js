import { toggleSearchInput } from "../view/searchSeaction.view";
import { toggleSettingsVisibility } from "../view/searchSeaction.view";
import { getWeatherData } from "../app";
import { selectTempSetting } from "../view/searchSeaction.view";

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
searchBtn.addEventListener("click", handleSearch);

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
