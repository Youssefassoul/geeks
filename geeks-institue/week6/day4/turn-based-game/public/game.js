// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("gameId");
const playerId = urlParams.get("playerId");

let gameState = null;
let pollingInterval = null;

// Initialize game
if (!gameId || !playerId) {
  alert("Invalid game parameters");
  window.location.href = "/";
} else {
  startGame();
}

async function startGame() {
  await loadGameState();
  setupEventListeners();
  startPolling();
}

function setupEventListeners() {
  document
    .getElementById("move-up")
    .addEventListener("click", () => makeMove("up"));
  document
    .getElementById("move-down")
    .addEventListener("click", () => makeMove("down"));
  document
    .getElementById("move-left")
    .addEventListener("click", () => makeMove("left"));
  document
    .getElementById("move-right")
    .addEventListener("click", () => makeMove("right"));
  document.getElementById("attack-btn").addEventListener("click", attackBase);
  document
    .getElementById("leave-game-btn")
    .addEventListener("click", leaveGame);

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (gameState && gameState.status === "active" && gameState.isYourTurn) {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          makeMove("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          makeMove("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          makeMove("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          makeMove("right");
          break;
        case " ":
          e.preventDefault();
          attackBase();
          break;
      }
    }
  });
}

async function loadGameState() {
  try {
    const response = await fetch(
      `/api/game/${gameId}/state?playerId=${playerId}`,
    );
    const data = await response.json();

    if (data.success) {
      gameState = data.gameState;
      renderGame();
    } else {
      showStatus("Failed to load game", "error");
    }
  } catch (error) {
    console.error("Error loading game state:", error);
    showStatus("Connection error", "error");
  }
}

function renderGame() {
  if (!gameState) return;

  // Update player info
  const player1Info = document.getElementById("player1-info");
  const player2Info = document.getElementById("player2-info");

  player1Info.querySelector(".player-name").textContent =
    gameState.players.player1.name;

  if (gameState.players.player2) {
    player2Info.querySelector(".player-name").textContent =
      gameState.players.player2.name;
  } else {
    player2Info.querySelector(".player-name").textContent = "Waiting...";
  }

  // Update turn indicator
  const turnIndicator = document.getElementById("turn-indicator");

  if (gameState.status === "waiting") {
    turnIndicator.textContent = "Waiting for player 2...";
    turnIndicator.style.color = "#6b7280";
  } else if (gameState.status === "finished") {
    const winner = gameState.players[gameState.winner];
    turnIndicator.textContent = `${winner.name} Wins! 🎉`;
    turnIndicator.style.color = "#10b981";
  } else {
    if (gameState.isYourTurn) {
      turnIndicator.textContent = "Your Turn!";
      turnIndicator.style.color = "#10b981";
    } else {
      const currentPlayer = gameState.players[gameState.currentTurn];
      turnIndicator.textContent = `${currentPlayer.name}'s Turn`;
      turnIndicator.style.color = "#6b7280";
    }
  }

  // Render game board
  renderBoard();

  // Update controls
  updateControls();
}

function renderBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  for (let y = 0; y < gameState.gridSize; y++) {
    for (let x = 0; x < gameState.gridSize; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = x;
      cell.dataset.y = y;

      // Check if it's a base
      const isPlayer1Base =
        x === gameState.players.player1.base.x &&
        y === gameState.players.player1.base.y;
      const isPlayer2Base =
        gameState.players.player2 &&
        x === gameState.players.player2.base.x &&
        y === gameState.players.player2.base.y;

      // Check if it's a player position
      const isPlayer1 =
        x === gameState.players.player1.position.x &&
        y === gameState.players.player1.position.y;
      const isPlayer2 =
        gameState.players.player2 &&
        x === gameState.players.player2.position.x &&
        y === gameState.players.player2.position.y;

      // Check if it's an obstacle
      const isObstacle = gameState.grid[y][x].type === "obstacle";

      if (isObstacle) {
        cell.classList.add("obstacle");
        cell.textContent = "🧱";
      } else if (isPlayer1Base && !isPlayer2) {
        cell.classList.add("base");
        cell.style.backgroundColor = gameState.players.player1.color;
        cell.textContent = "🏰";
      } else if (isPlayer2Base && !isPlayer1) {
        cell.classList.add("base");
        cell.style.backgroundColor = gameState.players.player2.color;
        cell.textContent = "🏰";
      } else if (isPlayer1) {
        cell.classList.add("player");
        cell.style.backgroundColor = gameState.players.player1.color;
        cell.textContent = "🔵";
      } else if (isPlayer2) {
        cell.classList.add("player");
        cell.style.backgroundColor = gameState.players.player2.color;
        cell.textContent = "🔴";
      }

      board.appendChild(cell);
    }
  }
}

function updateControls() {
  const moveButtons = ["move-up", "move-down", "move-left", "move-right"];
  const attackBtn = document.getElementById("attack-btn");

  const canMove = gameState.status === "active" && gameState.isYourTurn;

  moveButtons.forEach((btnId) => {
    const btn = document.getElementById(btnId);
    btn.disabled = !canMove;
  });

  // Check if player can attack (adjacent to opponent base)
  const canAttack = canMove && isAdjacentToOpponentBase();
  attackBtn.disabled = !canAttack;
}

function isAdjacentToOpponentBase() {
  if (!gameState || !gameState.players.player2) return false;

  const myPlayerKey = gameState.yourPlayerKey;
  const opponentKey = myPlayerKey === "player1" ? "player2" : "player1";

  const myPos = gameState.players[myPlayerKey].position;
  const opponentBase = gameState.players[opponentKey].base;

  const dx = Math.abs(myPos.x - opponentBase.x);
  const dy = Math.abs(myPos.y - opponentBase.y);

  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

async function makeMove(direction) {
  if (!gameState.isYourTurn || gameState.status !== "active") {
    return;
  }

  try {
    const response = await fetch(`/api/game/${gameId}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId, direction }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      if (data.gameOver) {
        showStatus(data.message, "success");
        stopPolling();
      } else if (data.adjacentToBase) {
        showStatus("You can attack the base!", "warning");
      }
      await loadGameState();
    } else {
      showStatus(data.error || "Invalid move", "error");
    }
  } catch (error) {
    console.error("Error making move:", error);
    showStatus("Connection error", "error");
  }
}

async function attackBase() {
  if (!gameState.isYourTurn || gameState.status !== "active") {
    return;
  }

  if (!isAdjacentToOpponentBase()) {
    showStatus(
      "You must be adjacent to the opponent's base to attack!",
      "error",
    );
    return;
  }

  try {
    const response = await fetch(`/api/game/${gameId}/attack`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showStatus(data.message, "success");
      stopPolling();
      await loadGameState();
    } else {
      showStatus(data.error || "Cannot attack", "error");
    }
  } catch (error) {
    console.error("Error attacking base:", error);
    showStatus("Connection error", "error");
  }
}

function showStatus(message, type = "info") {
  const statusDiv = document.getElementById("game-status");
  statusDiv.textContent = message;
  statusDiv.className = `game-status ${type}`;

  // Auto-hide after 5 seconds for non-success messages
  if (type !== "success") {
    setTimeout(() => {
      statusDiv.textContent = "";
      statusDiv.className = "game-status";
    }, 5000);
  }
}

function startPolling() {
  // Poll for game state updates every 2 seconds
  pollingInterval = setInterval(async () => {
    if (gameState && gameState.status !== "finished") {
      await loadGameState();
    } else if (gameState && gameState.status === "finished") {
      stopPolling();
    }
  }, 2000);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

function leaveGame() {
  if (confirm("Are you sure you want to leave the game?")) {
    stopPolling();
    window.location.href = "/";
  }
}

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  stopPolling();
});
