let selectedColor = null;
let isDrawing = false;
let brushSize = 1;

let pageBody = document.getElementsByTagName("body")[0];
let colorPalette = document.querySelectorAll("#sidebar > *");
let canvasPixels = document.querySelectorAll("#main > *");
let eraseButton = document.getElementsByTagName("button")[0];

// Add keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    selectedColor = null;
    console.log("Color selection cleared");
  }
  if (event.key === "c" || event.key === "C") {
    eraseButton.click();
  }
});

eraseButton.addEventListener("click", function () {
  for (let pixel of canvasPixels) {
    pixel.style.backgroundColor = "white";
  }
});

pageBody.addEventListener("mousedown", function () {
  isDrawing = true;
});

pageBody.addEventListener("mouseup", function () {
  isDrawing = false;
});

for (let colorBlock of colorPalette) {
  colorBlock.addEventListener("click", function (event) {
    selectedColor = event.target.style.backgroundColor;
    console.log("Selected color:", selectedColor);
  });
}

for (let pixel of canvasPixels) {
  pixel.addEventListener("mousedown", function (event) {
    if (selectedColor != null)
      event.target.style.backgroundColor = selectedColor;
  });
  pixel.addEventListener("mouseover", function (event) {
    if (isDrawing && selectedColor != null)
      event.target.style.backgroundColor = selectedColor;
  });
}
