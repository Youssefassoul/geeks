import random


class Game:
    def __init__(self):
        self.valid_items = ["rock", "paper", "scissors"]

    def get_user_item(self):
        """Ask the user to select an item (rock/paper/scissors).
        Keep asking until valid input."""
        while True:
            prompt = "Please select rock, paper, or scissors: "
            user_input = input(prompt).lower().strip()
            if user_input in self.valid_items:
                return user_input
            else:
                msg = "Invalid choice! Please select rock, paper, or scissors."
                print(msg)

    def get_computer_item(self):
        """Select rock/paper/scissors at random for the computer."""
        return random.choice(self.valid_items)

    def get_game_result(self, user_item, computer_item):
        """Determine the result of the game."""
        if user_item == computer_item:
            return "draw"

        # Define winning combinations
        winning_combinations = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper",
        }

        if winning_combinations[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Play a single game of rock-paper-scissors."""
        # Get user's item
        user_item = self.get_user_item()

        # Get computer's item
        computer_item = self.get_computer_item()

        # Determine game result
        result = self.get_game_result(user_item, computer_item)

        # Print game output
        message = f"You selected {user_item}. The computer selected {computer_item}. "
        print(message, end="")

        if result == "win":
            print("You win!")
        elif result == "loss":
            print("You lose!")
        else:
            print("You drew!")

        # Return the result
        return result
