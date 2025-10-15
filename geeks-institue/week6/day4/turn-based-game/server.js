const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const GameManager = require("./game/GameManager");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Game Manager
const gameManager = new GameManager();

// Routes

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Register/Login (simplified - just creates a player)
app.post("/api/auth/register", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  const playerId = gameManager.createPlayer(name.trim());

  res.json({
    success: true,
    playerId,
    name: name.trim(),
    message: "Player registered successfully",
  });
});

// Get player info
app.get("/api/player/:playerId", (req, res) => {
  const { playerId } = req.params;
  const player = gameManager.getPlayer(playerId);

  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  res.json({ success: true, player });
});

// Create a new game
app.post("/api/game/create", (req, res) => {
  const { playerId } = req.body;

  const player = gameManager.getPlayer(playerId);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  const gameId = gameManager.createGame(playerId, player.name);

  res.json({
    success: true,
    gameId,
    message: "Game created successfully",
  });
});

// Get available games
app.get("/api/game/available", (req, res) => {
  const games = gameManager.getAvailableGames();
  res.json({ success: true, games });
});

// Join a game
app.post("/api/game/join", (req, res) => {
  const { gameId, playerId } = req.body;

  const player = gameManager.getPlayer(playerId);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  const result = gameManager.joinGame(gameId, playerId, player.name);

  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json({
    success: true,
    gameId,
    message: result.message,
  });
});

// Get game state
app.get("/api/game/:gameId/state", (req, res) => {
  const { gameId } = req.params;
  const { playerId } = req.query;

  const game = gameManager.getGame(gameId);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const gameState = game.getGameState(playerId);
  res.json({ success: true, gameState });
});

// Make a move
app.post("/api/game/:gameId/move", (req, res) => {
  const { gameId } = req.params;
  const { playerId, direction } = req.body;

  const game = gameManager.getGame(gameId);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const result = game.makeMove(playerId, direction);

  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json(result);
});

// Attack base
app.post("/api/game/:gameId/attack", (req, res) => {
  const { gameId } = req.params;
  const { playerId } = req.body;

  const game = gameManager.getGame(gameId);
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const result = game.attackBase(playerId);

  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }

  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
