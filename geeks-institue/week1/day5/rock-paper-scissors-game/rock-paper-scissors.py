from game import Game


def get_user_menu_choice():
    """Display menu and get user's choice with data validation."""
    print("\n=== Rock Paper Scissors Game ===")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")
    
    while True:
        choice = input("Please enter your choice (1-3): ").strip()
        if choice in ['1', '2', '3']:
            return choice
        else:
            print("Invalid choice! Please enter 1, 2, or 3.")


def print_results(results):
    """Print the results of all games played."""
    print("\n=== Game Results ===")
    print(f"Wins: {results.get('win', 0)}")
    print(f"Losses: {results.get('loss', 0)}")
    print(f"Draws: {results.get('draw', 0)}")
    
    total_games = sum(results.values())
    if total_games > 0:
        win_rate = (results.get('win', 0) / total_games) * 100
        print(f"Total games: {total_games}")
        print(f"Win rate: {win_rate:.1f}%")
    
    print("\nThank you for playing Rock Paper Scissors!")


def main():
    """Main function to run the game."""
    results = {'win': 0, 'loss': 0, 'draw': 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == '1':
            # Play a new game
            print("\nStarting a new game...")
            game = Game()
            result = game.play()
            results[result] += 1
            print(f"Game result: {result}")
            
        elif choice == '2':
            # Show scores
            print_results(results)
            
        elif choice == '3':
            # Quit the program
            print("\nExiting the game...")
            print_results(results)
            break


if __name__ == "__main__":
    main()
