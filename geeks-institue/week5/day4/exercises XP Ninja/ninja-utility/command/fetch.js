const axios = require("axios");
module.exports = async () => {
  const response = await axios.get("https://api.chucknorris.io/jokes/random");
  console.log("Joke:", response.data.value);
};
