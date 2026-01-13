// Toggles the visibility of the search input field
export function toggleSearchInput() {
  const searchInput = document.querySelector(".search-input");

  searchInput.style.display === "none"
    ? (searchInput.style.display = "block")
    : (searchInput.style.display = "none");
}

// Toggles the visibility of the temp scale settings
export function toggleSettingsVisibility() {
  const degreeBtns = document.querySelector(".degree-buttons");
  degreeBtns.style.display === "none"
    ? (degreeBtns.style.display = "block")
    : (degreeBtns.style.display = "none");
}

export function selectTempSetting(temp) {
  const buttons = document.querySelectorAll(".degree-buttons > button");

  buttons.forEach((btn) => {
    if (temp === btn.dataset.unit) {
      btn.style.backgroundColor = "aliceblue";
      btn.style.color = "black";
    } else {
      btn.style.backgroundColor = "transparent";
      btn.style.color = "aliceblue";
    }
  });
}
