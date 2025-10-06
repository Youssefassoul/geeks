import checkWeather from "./weather.js";
import promptCityName from "./dashboard.js";

promptCityName((city) => {
  checkWeather(city);
});

//
