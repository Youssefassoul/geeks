import axios from "axios";
import chalk from "chalk";

const checkWeather = function (city) {
  const apiKey = "6fd603c4f0ffb30432082556decf1808"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios
    .get(url)
    .then((response) => {
      const weatherData = response.data;
      const temperature = weatherData.main?.temp;
      const description = weatherData.weather?.[0]?.description;
      const cityName = weatherData.name;
      const country = weatherData.sys?.country;

      console.log(chalk.green(`Weather in ${cityName}, ${country}:`));
      console.log(chalk.yellow(`Temperature: ${temperature}°C`));
      console.log(chalk.blue(`Description: ${description}`));
    })
    .catch((error) => {
      console.error(chalk.red("Error fetching weather data:", error));
    });
};

export default checkWeather;
