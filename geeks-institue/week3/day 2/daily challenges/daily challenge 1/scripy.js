document.body.style.backgroundColor = "black";

// Array of planets
const planetsData = [
  {
    name: "Mercury",
    color: "gray",
    moons: [],
  },
  {
    name: "Venus",
    color: "gold",
    moons: [],
  },
  {
    name: "Earth",
    color: "blue",
    moons: ["Moon"],
  },
  {
    name: "Mars",
    color: "red",
    moons: ["Phobos", "Deimos"],
  },
  {
    name: "Jupiter",
    color: "orange",
    moons: ["Io", "Europa", "Ganymede", "Callisto"],
  },
  {
    name: "Saturn",
    color: "khaki",
    moons: ["Titan", "Rhea", "Iapetus"],
  },
  {
    name: "Uranus",
    color: "lightseagreen",
    moons: ["Titania", "Oberon", "Umbriel"],
  },
  {
    name: "Neptune",
    color: "darkblue",
    moons: ["Triton", "Nereid"],
  },
];

// Select the solarSystem container
const solarSystem = document.getElementsByClassName("solarSystem")[0];
solarSystem.style.display = "flex";
solarSystem.style.flexWrap = "wrap";
solarSystem.style.justifyContent = "center";

// Loop through the planets
planetsData.forEach((planetData) => {
  // Create a container div for the planet and its moons
  const planetContainer = document.createElement("div");
  planetContainer.classList.add("planet-container");
  planetContainer.style.position = "relative";
  planetContainer.style.width = "200px"; // Adjust as needed for orbit
  planetContainer.style.height = "200px"; // Adjust as needed for orbit
  planetContainer.style.margin = "20px";

  // Create the planet core div
  const planetDiv = document.createElement("div");
  planetDiv.classList.add("planet");
  planetDiv.textContent = planetData.name;
  planetDiv.style.width = "100px";
  planetDiv.style.height = "100px";
  planetDiv.style.borderRadius = "50%";
  planetDiv.style.backgroundColor = planetData.color;
  planetDiv.style.color = "white";
  planetDiv.style.display = "flex";
  planetDiv.style.alignItems = "center";
  planetDiv.style.justifyContent = "center";
  planetDiv.style.fontWeight = "bold";
  planetDiv.style.position = "absolute";
  planetDiv.style.top = "50%";
  planetDiv.style.left = "50%";
  planetDiv.style.transform = "translate(-50%, -50%)";

  planetContainer.appendChild(planetDiv);
  solarSystem.appendChild(planetContainer);

  // Create and append moons
  planetData.moons.forEach((moonName, moonIndex) => {
    const moonDiv = document.createElement("div");
    moonDiv.classList.add("moon");
    moonDiv.textContent = moonName;
    moonDiv.style.width = "20px";
    moonDiv.style.height = "20px";
    moonDiv.style.borderRadius = "50%";
    moonDiv.style.backgroundColor = "lightgray";
    moonDiv.style.color = "black";
    moonDiv.style.fontSize = "8px";
    moonDiv.style.display = "flex";
    moonDiv.style.alignItems = "center";
    moonDiv.style.justifyContent = "center";
    moonDiv.style.position = "absolute";

    const orbitRadius = 70; // Distance from planet center
    const angle = (360 / planetData.moons.length) * moonIndex * (Math.PI / 180); // Distribute moons evenly

    const moonX = orbitRadius * Math.cos(angle);
    const moonY = orbitRadius * Math.sin(angle);

    moonDiv.style.left = `calc(50% + ${moonX}px)`;
    moonDiv.style.top = `calc(50% + ${moonY}px)`;
    moonDiv.style.transform = "translate(-50%, -50%)";

    planetContainer.appendChild(moonDiv);
  });
});
