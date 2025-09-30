const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

const form = document.querySelector("form");
const searchInput = document.getElementById("searchInput");
const gifContainer = document.getElementById("gifContainer");
const deleteAllButton = document.getElementById("deleteAllButton");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const term = searchInput.value.trim();
  if (!term) {
    errorMessage.textContent = "Please enter a search term!";
    return;
  }
  errorMessage.textContent = "";

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
        term
      )}&limit=25&rating=g&lang=en`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    const results = json.data || [];
    if (results.length === 0) {
      errorMessage.textContent = "No GIFs found!";
      return;
    }

    const randomIndex = Math.floor(Math.random() * results.length);
    const gifUrl = results[randomIndex].images.original.url;

    const card = document.createElement("div");
    card.className = "gif-card";

    const img = document.createElement("img");
    img.src = gifUrl;
    img.alt = term;

    const delBtn = document.createElement("button");
    delBtn.textContent = "DELETE";
    delBtn.addEventListener("click", () => card.remove());

    card.appendChild(img);
    card.appendChild(delBtn);
    gifContainer.appendChild(card);
  } catch (err) {
    console.error("Error fetching GIFs:", err);
    errorMessage.textContent = "Error fetching GIFs";
  }
});

deleteAllButton.addEventListener("click", () => {
  gifContainer.innerHTML = "";
  errorMessage.textContent = "";
});
