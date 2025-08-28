user_word = input("Write your word here: ").strip()

letter_indexes = {}
for index, letter in enumerate(user_word):
    if letter not in letter_indexes:
        letter_indexes[letter] = []
    letter_indexes[letter].append(index)

print("Letter indexes:", letter_indexes)
