import readline from "readline";

function promptCityName(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter a city name: ", (city) => {
    rl.close();
    callback(city);
  });
}

export default promptCityName;
