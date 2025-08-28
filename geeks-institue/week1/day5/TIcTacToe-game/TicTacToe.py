def display_board(board):
    """Display the Tic Tac Toe board (GUI)."""
    print("\n" + "=" * 25)
    print("TIC TAC TOE")
    print("=" * 25)
    print()

    for i in range(3):
        print(f" {board[i*3]} | {board[i*3 + 1]} | {board[i*3 + 2]} ")
        if i < 2:
            print("-----------")
    print()
    print("Positions: 1-9 (left to right, top to bottom)")
    print("=" * 25)


def is_valid_move(board, position):
    """Check if the move is valid (position is empty and within range)."""
    return 1 <= position <= 9 and board[position - 1] == " "


def make_move(board, position, player):
    """Make a move on the board."""
    board[position - 1] = player


def player_input(player):
    """Get the position from the player."""
    while True:
        try:
            position = int(input(f"Player {player}, enter your move (1-9): "))
            if is_valid_move(board, position):
                return position
            else:
                print("Invalid move! Position already taken or out of range.")
                print("Try again.")
        except ValueError:
            print("Please enter a valid number between 1-9.")


def check_win(board):
    """Check whether there is a winner or not."""
    # Winning combinations (rows, columns, diagonals)
    win_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],  # Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],  # Columns
        [0, 4, 8],
        [2, 4, 6],  # Diagonals
    ]

    for combo in win_combinations:
        if board[combo[0]] == board[combo[1]] == board[combo[2]] != " ":
            return board[combo[0]]  # Return the winning player

    return None  # No winner yet


def is_board_full(board):
    """Check if the board is full (tie game)."""
    return " " not in board


def switch_player(current_player):
    """Switch between players."""
    return "O" if current_player == "X" else "X"


def play():
    """The main function, which calls all the functions created above."""
    global board
    board = [" " for _ in range(9)]  # Initialize empty board
    current_player = "X"
    game_over = False

    print("Welcome to Tic Tac Toe!")
    print("Player X goes first.")

    while not game_over:
        # Display the current board
        display_board(board)

        # Get player input
        position = player_input(current_player)

        # Make the move
        make_move(board, position, current_player)

        # Check for winner
        winner = check_win(board)
        if winner:
            display_board(board)
            print(f"\n🎉 Player {winner} wins! 🎉")
            game_over = True
            break

        # Check for tie
        if is_board_full(board):
            display_board(board)
            print("\n🤝 It's a tie! 🤝")
            game_over = True
            break

        # Switch players
        current_player = switch_player(current_player)

    # Ask if players want to play again
    play_again = input("\nWould you like to play again? (y/n): ")
    play_again = play_again.lower().strip()
    if play_again in ["y", "yes"]:
        print("\n" + "=" * 50)
        play()
    else:
        print("\nThanks for playing! Goodbye! 👋")


def main():
    """Entry point of the game."""
    try:
        play()
    except KeyboardInterrupt:
        print("\n\nGame interrupted. Goodbye! 👋")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
        print("Please try running the game again.")


if __name__ == "__main__":
    main()
