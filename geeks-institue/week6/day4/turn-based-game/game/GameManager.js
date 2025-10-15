const Game = require("./Game");
const { v4: uuidv4 } = require("uuid");

class GameManager {
  constructor() {
    this.games = new Map();
    this.players = new Map(); // playerId -> { name, currentGameId }
  }

  createPlayer(name) {
    const playerId = uuidv4();
    this.players.set(playerId, {
      name,
      currentGameId: null,
    });
    return playerId;
  }

  getPlayer(playerId) {
    return this.players.get(playerId);
  }

  createGame(playerId, playerName) {
    const gameId = uuidv4();
    const game = new Game(gameId, playerId, playerName);
    this.games.set(gameId, game);

    const player = this.players.get(playerId);
    if (player) {
      player.currentGameId = gameId;
    }

    return gameId;
  }

  getGame(gameId) {
    return this.games.get(gameId);
  }

  joinGame(gameId, playerId, playerName) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, message: "Game not found" };
    }

    const result = game.addPlayer2(playerId, playerName);

    if (result.success) {
      const player = this.players.get(playerId);
      if (player) {
        player.currentGameId = gameId;
      }
    }

    return result;
  }

  getAvailableGames() {
    const available = [];
    this.games.forEach((game, gameId) => {
      if (game.status === "waiting") {
        available.push({
          gameId,
          host: game.players.player1.name,
          status: game.status,
        });
      }
    });
    return available;
  }

  deleteGame(gameId) {
    this.games.delete(gameId);
  }
}

module.exports = GameManager;
