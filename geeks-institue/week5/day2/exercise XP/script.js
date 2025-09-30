//exercise 1 : Giphy API
const url =
  "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("✅ Giphy data:", data);
  })
  .catch((error) => {
    console.error("❌ Fetch error:", error);
  });

//exercise 2 :

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("☀️ Sun gifs:", data);
  })
  .catch((error) => {
    console.error("❌ Fetch error:", error);
  });

//exercise 3 :
async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("🚀 Star Wars starship:", data.result);
  } catch (error) {
    console.error("❌ Fetch error:", error);
  }
}

getStarship();
