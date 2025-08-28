# Rock Paper Scissors Game

A simple command-line rock-paper-scissors game implemented in Python.

## Files

- `game.py` - Contains the Game class with methods to play individual games
- `rock-paper-scissors.py` - Main game file with menu and game loop
- `test_game.py` - Test file to verify game logic
- `README.md` - This file

## How to Play

1. Run the main game:
   ```
   python rock-paper-scissors.py
   ```

2. Choose from the menu:
   - Option 1: Play a new game
   - Option 2: Show current scores
   - Option 3: Quit the game

3. When playing a game, type either:
   - `rock`
   - `paper`
   - `scissors`

## Testing

To test the game logic without playing:
```
python test_game.py
```

## Game Rules

- Rock beats Scissors
- Paper beats Rock
- Scissors beats Paper
- Same items result in a draw

## Features

- Input validation for user choices
- Random computer opponent
- Score tracking across multiple games
- Win rate calculation
- Clean, user-friendly interface
