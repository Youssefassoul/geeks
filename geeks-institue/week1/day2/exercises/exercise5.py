import random


def number_guessing_game(user_number):

    if not (1 <= user_number <= 100):
        print("Error: Please enter a number between 1 and 100.")
        return
    random_number = random.randint(1, 100)
    if user_number == random_number:
        print("Success! You've guessed the number.")
    else:
        print(f"Sorry, the correct number was {random_number}.")


number_guessing_game(50)
number_guessing_game(25)
number_guessing_game(75)
