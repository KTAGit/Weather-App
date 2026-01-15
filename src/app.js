import { updateAllRequiredData } from "./controller/controller";
import { changeTempUnit } from "./controller/controller";
import { location } from "./controller/controller";

export let currentWeatherDataStorage = null;
export let forecastWeatherDataStorage = null;

// Fetches weather data for a given location from the Visual Crossing API
export async function getWeatherData() {
  try {
    const weatherData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?include=current&unitGroup=${changeTempUnit()}&key=2UCL7UM4ZGHZDC4D46EL25MPM&contentType=json`
    );
    const data = await weatherData.json();

    getRequiredCurrentData(data);
  } catch {
    console.log("ERROR");
    throw new Error();
  }
}

// Weather data model containing only the fields required by the UI
class CreateWeatherObject {
  constructor(
    temp,
    feelslike,
    humidity,
    description,
    condition,
    datetime,
    windgust,
    location,
    icon,
    precip
  ) {
    this.temp = temp;
    this.feelslike = feelslike;
    this.humidity = humidity;
    this.description = description;
    this.condition = condition;
    this.datetime = datetime;
    this.windgust = windgust;
    this.location = location;
    this.icon = icon;
    this.precip = precip;
  }
}

// Extracts current weather conditions from fetched data
// and creates a simplified weather object for display
async function getRequiredCurrentData(data) {
  const objData = await data;
  const currentConditions = objData.currentConditions;
  const forecast = objData.days.slice(0, 7);

  //console.log(objData);

  const currentWeatherObject = new CreateWeatherObject(
    currentConditions.temp,
    currentConditions.feelslike,
    currentConditions.humidity,
    null,
    currentConditions.conditions,
    null,
    currentConditions.windgust,
    objData.resolvedAddress,
    currentConditions.icon,
    currentConditions.precip
  );

  currentWeatherDataStorage = currentWeatherObject;
  forecastWeatherDataStorage = forecast;
  console.log(forecast);
  updateAllRequiredData();
}
