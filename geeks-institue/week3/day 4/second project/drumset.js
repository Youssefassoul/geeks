// Drumset JavaScript - Event Handling and Audio Playback

// Get all drum pads and audio elements
const drumPads = document.querySelectorAll(".drum-pad");
const audioElements = document.querySelectorAll("audio");

// Function to play sound and add visual effect
function playSound(key) {
  // Find the audio element with matching data-key
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  const drumPad = document.querySelector(`.drum-pad[data-key="${key}"]`);

  if (!audio || !drumPad) return;

  // Reset audio to beginning and play
  audio.currentTime = 0;
  audio.play().catch((error) => {
    console.log("Audio play failed:", error);
  });

  // Add visual effect
  drumPad.classList.add("playing");

  // Remove visual effect after animation
  setTimeout(() => {
    drumPad.classList.remove("playing");
  }, 150);
}

// Keyboard event listener
document.addEventListener("keydown", function (event) {
  // Get the key pressed (convert to uppercase for consistency)
  const key = event.key.toUpperCase();

  // Check if it's one of our drum keys
  const validKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];

  if (validKeys.includes(key)) {
    playSound(key);
  }
});

// Mouse click event listeners for drum pads
drumPads.forEach((drumPad) => {
  drumPad.addEventListener("click", function () {
    // Get the data-key attribute from the clicked element
    const key = this.getAttribute("data-key");
    playSound(key);
  });
});

// Optional: Add touch support for mobile devices
drumPads.forEach((drumPad) => {
  drumPad.addEventListener("touchstart", function (event) {
    event.preventDefault(); // Prevent default touch behavior
    const key = this.getAttribute("data-key");
    playSound(key);
  });
});

// Optional: Add visual feedback for key presses
document.addEventListener("keydown", function (event) {
  const key = event.key.toUpperCase();
  const drumPad = document.querySelector(`.drum-pad[data-key="${key}"]`);

  if (drumPad) {
    drumPad.style.transform = "scale(0.95)";
  }
});

document.addEventListener("keyup", function (event) {
  const key = event.key.toUpperCase();
  const drumPad = document.querySelector(`.drum-pad[data-key="${key}"]`);

  if (drumPad) {
    drumPad.style.transform = "scale(1)";
  }
});

// Console log for debugging
console.log(
  "Drumset loaded! Press A, S, D, F, G, H, J, K, or L to play sounds!"
);
