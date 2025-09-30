const giphyApi = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const form = document.querySelector("form");
const searchInput = document.getElementById("searchInput");
const gifContainer = document.getElementById("gifContainer");
const errorMessage = document.getElementById("errorMessage");
const deleteButton = document.getElementById("deleteButton");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    errorMessage.textContent = "Please enter a search term!";
    return;
  }

  errorMessage.textContent = ""; // Clear previous errors
  gifContainer.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApi}&q=${encodeURIComponent(
        searchTerm
      )}&limit=25&offset=0&rating=g&lang=en`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      gifContainer.innerHTML = "No GIFs found!";
    } else {
      gifContainer.innerHTML = data.data
        .map((gif) => `<img src="${gif.images.original.url}" alt="GIF">`)
        .join("");
    }
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    errorMessage.textContent = "Error fetching GIFs";
  }
});

deleteButton.addEventListener("click", () => {
  gifContainer.innerHTML = "";
  errorMessage.textContent = "";
});
