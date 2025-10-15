class Game {
  constructor(gameId, player1Id, player1Name) {
    this.gameId = gameId;
    this.gridSize = 10;
    this.grid = this.initializeGrid();
    this.players = {
      player1: {
        id: player1Id,
        name: player1Name,
        position: { x: 0, y: 0 },
        base: { x: 0, y: 0 },
        color: "#3b82f6",
      },
      player2: null,
    };
    this.currentTurn = "player1";
    this.status = "waiting"; // waiting, active, finished
    this.winner = null;
    this.moveHistory = [];
  }

  initializeGrid() {
    const grid = [];
    for (let y = 0; y < this.gridSize; y++) {
      const row = [];
      for (let x = 0; x < this.gridSize; x++) {
        row.push({
          x,
          y,
          type: "empty", // empty, obstacle, base, player
          occupant: null,
        });
      }
      grid.push(row);
    }

    // Add random obstacles
    this.addObstacles(grid);

    return grid;
  }

  addObstacles(grid) {
    const obstacleCount = 15;
    let placed = 0;

    while (placed < obstacleCount) {
      const x = Math.floor(Math.random() * this.gridSize);
      const y = Math.floor(Math.random() * this.gridSize);

      // Don't place obstacles on corners or adjacent to corners
      if (
        (x === 0 && y === 0) ||
        (x === this.gridSize - 1 && y === this.gridSize - 1)
      ) {
        continue;
      }
      if (
        (x <= 1 && y <= 1) ||
        (x >= this.gridSize - 2 && y >= this.gridSize - 2)
      ) {
        continue;
      }

      if (grid[y][x].type === "empty") {
        grid[y][x].type = "obstacle";
        placed++;
      }
    }
  }

  addPlayer2(player2Id, player2Name) {
    if (this.players.player2) {
      return { success: false, message: "Game is full" };
    }

    this.players.player2 = {
      id: player2Id,
      name: player2Name,
      position: { x: this.gridSize - 1, y: this.gridSize - 1 },
      base: { x: this.gridSize - 1, y: this.gridSize - 1 },
      color: "#ef4444",
    };

    this.status = "active";
    return { success: true, message: "Player 2 joined successfully" };
  }

  getPlayerKey(playerId) {
    if (this.players.player1.id === playerId) return "player1";
    if (this.players.player2 && this.players.player2.id === playerId)
      return "player2";
    return null;
  }

  isValidMove(x, y) {
    if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) {
      return false;
    }
    if (this.grid[y][x].type === "obstacle") {
      return false;
    }
    return true;
  }

  makeMove(playerId, direction) {
    if (this.status !== "active") {
      return { success: false, message: "Game is not active" };
    }

    const playerKey = this.getPlayerKey(playerId);
    if (!playerKey) {
      return { success: false, message: "Player not in this game" };
    }

    if (this.currentTurn !== playerKey) {
      return { success: false, message: "Not your turn" };
    }

    const player = this.players[playerKey];
    const opponentKey = playerKey === "player1" ? "player2" : "player1";
    const opponent = this.players[opponentKey];

    // Calculate new position
    let newX = player.position.x;
    let newY = player.position.y;

    switch (direction) {
      case "up":
        newY -= 1;
        break;
      case "down":
        newY += 1;
        break;
      case "left":
        newX -= 1;
        break;
      case "right":
        newX += 1;
        break;
      default:
        return { success: false, message: "Invalid direction" };
    }

    // Validate move
    if (!this.isValidMove(newX, newY)) {
      return { success: false, message: "Invalid move" };
    }

    // Update position
    player.position = { x: newX, y: newY };

    // Record move
    this.moveHistory.push({
      player: playerKey,
      from: { x: player.position.x, y: player.position.y },
      to: { x: newX, y: newY },
      turn: this.moveHistory.length + 1,
    });

    // Check if player reached opponent's base
    if (newX === opponent.base.x && newY === opponent.base.y) {
      this.status = "finished";
      this.winner = playerKey;
      return {
        success: true,
        message: `${player.name} wins by capturing the base!`,
        gameOver: true,
        winner: playerKey,
      };
    }

    // Check if player is adjacent to opponent's base (can attack)
    const isAdjacent = this.isAdjacentToBase(newX, newY, opponent.base);

    // Switch turn
    this.currentTurn = opponentKey;

    return {
      success: true,
      message: "Move successful",
      position: { x: newX, y: newY },
      adjacentToBase: isAdjacent,
      gameOver: false,
    };
  }

  isAdjacentToBase(x, y, base) {
    const dx = Math.abs(x - base.x);
    const dy = Math.abs(y - base.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
  }

  attackBase(playerId) {
    if (this.status !== "active") {
      return { success: false, message: "Game is not active" };
    }

    const playerKey = this.getPlayerKey(playerId);
    if (!playerKey) {
      return { success: false, message: "Player not in this game" };
    }

    if (this.currentTurn !== playerKey) {
      return { success: false, message: "Not your turn" };
    }

    const player = this.players[playerKey];
    const opponentKey = playerKey === "player1" ? "player2" : "player1";
    const opponent = this.players[opponentKey];

    // Check if adjacent to opponent's base
    if (
      !this.isAdjacentToBase(
        player.position.x,
        player.position.y,
        opponent.base,
      )
    ) {
      return { success: false, message: "Not adjacent to opponent base" };
    }

    // Player wins by attacking the base
    this.status = "finished";
    this.winner = playerKey;

    return {
      success: true,
      message: `${player.name} wins by attacking the base!`,
      gameOver: true,
      winner: playerKey,
    };
  }

  getGameState(playerId) {
    const playerKey = this.getPlayerKey(playerId);

    return {
      gameId: this.gameId,
      gridSize: this.gridSize,
      grid: this.grid,
      players: this.players,
      currentTurn: this.currentTurn,
      isYourTurn: this.currentTurn === playerKey,
      status: this.status,
      winner: this.winner,
      yourPlayerKey: playerKey,
    };
  }
}

module.exports = Game;
