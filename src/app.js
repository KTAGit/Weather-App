// const weatherData = getWeatherData("London");

// Fetches weather data for a given location from the Visual Crossing API
async function getWeatherData(location) {
  try {
    // const weatherData = await fetch(
    //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?include=current&unitGroup=metric&key=2UCL7UM4ZGHZDC4D46EL25MPM&contentType=json`
    // );
    const data = await weatherData.json();

    return data;
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
    icon
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
  }
}

// Extracts current weather conditions from fetched data
// and creates a simplified weather object for display
async function getRequiredCurrentData() {
  const objData = await weatherData;
  const currentConditions = objData.currentConditions;

  console.log(currentConditions);

  const currentWeatherObject = new CreateWeatherObject(
    currentConditions.temp,
    currentConditions.feelslike,
    currentConditions.humidity,
    null,
    currentConditions.conditions,
    null,
    currentConditions.windgust,
    objData.resolvedAddress,
    currentConditions.icon
  );
  console.log(currentWeatherObject);
}

// getRequiredCurrentData();
